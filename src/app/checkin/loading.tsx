import { Skeleton } from '@/components/ui/skeleton'

export default function CheckInLoading() {
  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Skeleton className="h-6 w-32 rounded-md mb-1" />
          <Skeleton className="h-3 w-16 rounded-sm" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border"
            >
              <Skeleton className="h-3 w-12 rounded-sm mb-2" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="py-3">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* Guest list */}
        <div className="space-y-2.5 pb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <div className="flex gap-3">
                    <Skeleton className="h-3 w-16 rounded-sm" />
                    <Skeleton className="h-3 w-20 rounded-sm" />
                  </div>
                </div>
                <Skeleton className="h-3 w-16 rounded-sm" />
              </div>
              <Skeleton className="h-10 w-full rounded-full mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}