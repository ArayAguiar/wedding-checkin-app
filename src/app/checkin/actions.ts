"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function checkInGuest(
  guestId: string,
  includeCompanion: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // FIX: getUser() validates the JWT with Supabase Auth server
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  // Verify staff role by email
  const { data: staff } = await supabase
    .from("staff")
    .select("id")
    .eq("email", user.email)
    .single()

  if (!staff) {
    return { success: false, error: "Not staff" }
  }

  // Perform check-in with staff audit
  const updateData = includeCompanion
    ? { check_in: true, check_in_acomp: true, staff_id: staff.id }
    : { check_in: true, staff_id: staff.id }

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId)

  if (error) {
    console.error("Check-in error:", error)
    return { success: false, error: "Database error" }
  }

  revalidatePath("/checkin")
  return { success: true }
}

export async function undoCheckIn(
  guestId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { success: false, error: "Unauthorized" }
  }

  const { data: staff } = await supabase
    .from("staff")
    .select("id")
    .eq("email", user.email)
    .single()

  if (!staff) {
    return { success: false, error: "Not staff" }
  }

  const { error } = await supabase
    .from("guests")
    .update({ check_in: false, check_in_acomp: false, staff_id: null })
    .eq("id", guestId)

  if (error) {
    return { success: false, error: "Database error" }
  }

  revalidatePath("/checkin")
  return { success: true }
}