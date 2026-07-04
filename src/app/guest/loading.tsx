export default function GuestLoading() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 mx-auto rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-48 mx-auto bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 mx-auto bg-muted rounded animate-pulse" />
        </div>
        <div className="p-6 border rounded-lg space-y-4">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
        </div>
      </div>
    </main>
  )
}