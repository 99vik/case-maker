import { auth } from "@/auth";
import FullWidthWrapper from "@/components/FullWidthWrapper";
import { Button } from "@/components/ui/button";
import { getUserConfigurations } from "@/db/queries";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { configurations } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Phone from "@/components/Phone";
import { COLORS } from "@/lib/configuration-options";

function ConfigurationCard({
  configuration,
}: {
  configuration: InferSelectModel<typeof configurations>;
}) {
  return (
    <div className="flex w-[400px] rounded-lg border bg-background p-2 shadow-sm">
      <Phone
        imgSrc={configuration.croppedImgUrl!}
        smallerRadius={true}
        backgroundColor={
          COLORS.find((color) => color.value === configuration.caseColor)!
            .twClass
        }
        className="z-50 w-24 sm:w-40"
      />
      <div>asd</div>
    </div>
  );
}

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/signin");

  const configurations = await getUserConfigurations({
    userEmail: user.email!,
  });

  const configurationCards = configurations.map((configuration) => (
    <ConfigurationCard key={configuration.id} configuration={configuration} />
  ));

  console.log(configurations);

  return (
    <FullWidthWrapper className="space-y-2 py-6 lg:py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My configurations</h1>
        <Button className="gap-2">
          <Plus size={18} />
          Create New Design
        </Button>
      </div>
      <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700"></div>
      <div className="flex flex-wrap gap-4">{configurationCards}</div>
    </FullWidthWrapper>
  );
}
