import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResourcesGrid from "./ResourcesGrid";
import AddResourceButton from "./AddResourceButton";
import { Suspense } from "react";
import ResourcesGridSkeleton from "@/components/skeletons/ResourcesGridSkeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResourcesPage({
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
      <Card className=" border-0 ">
        <CardHeader className=" flex flex-row items-center justify-between ">
          <CardTitle className=" text-2xl font-semibold">Resources</CardTitle>
          <AddResourceButton id={params.id} />
        </CardHeader>
      </Card>
      <Suspense fallback={<ResourcesGridSkeleton />}>
        <ResourcesGrid projectId={params.id} />
      </Suspense>
    </div>
  );
}
