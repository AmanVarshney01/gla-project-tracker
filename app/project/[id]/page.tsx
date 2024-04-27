import DashboardGrid from "./_components/DashboardGrid";
import { Suspense } from "react";
import DashboardGridSkeleton from "@/components/skeletons/DashboardGridSkeleton";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";

export default async function ProjectPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4">
      <Card className="border-0">
        <CardHeader>
          <CardTitle className=" text-2xl font-semibold">Dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Suspense fallback={<DashboardGridSkeleton />}>
        <DashboardGrid projectId={params.id} />
      </Suspense>
    </div>
  );
}
