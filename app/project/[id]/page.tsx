import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardGrid from "./DashboardGrid";
import { Suspense } from "react";
import DashboardGridSkeleton from "@/components/skeletons/DashboardGridSkeleton";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";

export default async function ProjectPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Card className="border-0">
        <CardHeader>
          <CardTitle className=" text-2xl font-semibold">Dashboard</CardTitle>
        </CardHeader>
      </Card>
      <Suspense fallback={<DashboardGridSkeleton />}>
        <DashboardGrid projectId={params.id} userID={user.id} />
      </Suspense>
    </div>
  );
}
