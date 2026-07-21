"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function checkInGuest(
  guestId: string,
  includeCompanion: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // 1. Verify session
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return { success: false, error: "Unauthorized" }
  }

  // 2. Verify staff role by email
  const { data: staff } = await supabase
    .from("staff")
    .select("id")
    .eq("email", session.user.email)
    .single()

  if (!staff) {
    return { success: false, error: "Not staff" }
  }

  // 3. Perform check-in with staff audit
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

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return { success: false, error: "Unauthorized" }
  }

  const { data: staff } = await supabase
    .from("staff")
    .select("id")
    .eq("email", session.user.email)
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