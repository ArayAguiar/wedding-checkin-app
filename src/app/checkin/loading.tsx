export default function CheckInLoading() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex gap-3 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none p-4 border rounded-lg w-40">
              <div className="h-6 w-8 bg-muted rounded animate-pulse mx-auto mb-2" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
        <div className="p-4 border rounded-lg space-y-3">
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="border-t border-muted-foreground/20 my-2" />
            <div className="flex justify-between">
              <div className="h-4 w-36 bg-muted rounded animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}