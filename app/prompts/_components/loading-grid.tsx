import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingGrid = () => {
  // Create an array of 6 items to show loading state
  return (
    <>
      <div className="mb-6 flex justify-end">
        <Skeleton className="h-10 w-[140px]" /> {/* Create Prompt button skeleton */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="h-full flex flex-col bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700/50"
          >
            <CardContent className="pt-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4 gap-2">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title skeleton */}
                  <Skeleton className="h-4 w-full" /> {/* Description skeleton */}
                </div>
                <div className="flex gap-1">
                  {/* Action button skeletons */}
                  <Skeleton className="h-7 w-7" />
                  <Skeleton className="h-7 w-7" />
                  <Skeleton className="h-7 w-7" />
                </div>
              </div>
              {/* Content skeleton */}
              <div className="flex-grow mt-2 bg-gray-100 dark:bg-gray-700/60 rounded p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
