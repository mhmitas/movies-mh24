import { Skeleton } from "@/components/ui/skeleton"

const MovieCardSkeleton = () => {
    return (
        <div className="w-full max-w-sm shadow-lg overflow-hidden py-0 cursor-pointer group relative transition-all duration-300">
            {/* Image skeleton */}
            <section className="relative w-full overflow-hidden bg-muted">
                <div className="w-full aspect-[2/3] relative">
                    <Skeleton className="h-full w-full rounded" />
                </div>
            </section>

            {/* Content skeleton */}
            <section className="p-1">
                {/* Title skeleton */}
                <Skeleton className="h-5 w-4/5 mb-2" />

                {/* Info and badge skeleton */}
                <div className="flex items-center justify-between text-sm space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <Skeleton className="h-4 w-10" /> {/* Year */}
                        <span className="text-muted-foreground/30">•</span>
                        <Skeleton className="h-4 w-12" /> {/* Runtime */}
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
                </div>
            </section>
        </div>
    )
}

export default MovieCardSkeleton
