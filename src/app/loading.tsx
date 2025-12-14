import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-8 animate-pulse">
        {/* Left Column */}
        <div className="md:col-span-1 lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="p-0 relative h-20 bg-muted">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <Skeleton className="w-20 h-20 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pt-12 text-center">
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="md:col-span-3 lg:col-span-5 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-10 flex-1 rounded-md" />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="w-full space-y-1.5">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                  <Skeleton className="aspect-video w-full mt-4 rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
