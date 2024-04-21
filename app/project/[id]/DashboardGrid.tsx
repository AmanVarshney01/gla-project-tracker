import GithubCard from "@/components/GithubCard";
import StatusBadge from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardGrid({
  projectId,
  userID,
}: {
  projectId: number;
  userID: string;
}) {
  const supabase = createClient();

  const project = await supabase
    .from("projects")
    .select(
      `
  name,
  users (
    name,
    email
  ),
  project_details (
    description,
    start_date,
    end_date,
    status,
    github_url
  ),
  project_members (
    member_email,
    users (
      name
    ),
    role
  )
  `,
    )
    .eq("id", projectId)
    .single();

  if (project.error) {
    throw new Error(project.error.message);
  }

  const isGithubConnected =
    project.data?.project_details[0].github_url !== null;

  return (
    <section className=" flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className=" flex flex-col items-start justify-between gap-2 text-2xl md:flex-row md:items-center md:gap-4">
            <span>{project.data?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className=" text-lg">
            {project.data?.project_details[0].description}
          </CardDescription>
        </CardContent>
      </Card>
      <div className=" flex flex-col gap-4 lg:flex-row">
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle className=" text-xl">Project Details</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-4">
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Status</span>
              <StatusBadge variant={project.data?.project_details[0].status} />
            </div>
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">Start Date</span>
              <span className="">
                {new Date(
                  project.data?.project_details[0].start_date!,
                ).toDateString()}
              </span>
            </div>
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className=" font-medium">End Date</span>
              <span className="">
                {new Date(
                  project.data?.project_details[0].end_date!,
                ).toDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
        <GithubCard
          projectId={projectId}
          githubUrl={project.data?.project_details[0].github_url!}
          isGithubConnected={isGithubConnected}
        />
        <Card className="h-min w-full">
          <CardHeader>
            <CardTitle className=" text-xl">Team Members</CardTitle>
          </CardHeader>
          <CardContent className=" space-y-4">
            <div className=" flex flex-row items-center justify-between gap-4">
              <div className=" flex flex-col">
                <span className="">{project.data?.users?.name}</span>
                <span className=" text-sm text-muted-foreground">
                  {project.data?.users?.email}
                </span>
              </div>
              <Badge className=" rounded-full">owner</Badge>
            </div>
            {project.data?.project_members.map((member) => (
              <div
                className=" flex flex-row items-center justify-between gap-4"
                key={member.member_email}
              >
                <div className=" flex flex-col">
                  <span className="">{member.users?.name}</span>
                  <span className=" text-sm text-muted-foreground">
                    {member.member_email}
                  </span>
                </div>
                <Badge className=" rounded-full">{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
