import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsGridSkeleton() {
  return (
    <div className=" grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="h-44" />
      <Skeleton className="h-44" />
      <Skeleton className="h-44" />
    </div>
  );
}
