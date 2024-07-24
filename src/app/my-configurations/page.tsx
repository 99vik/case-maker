import { auth } from "@/auth";
import FullWidthWrapper from "@/components/FullWidthWrapper";
import { Button } from "@/components/ui/button";
import { getUserConfigurations } from "@/db/queries";
import { Pencil, Plus, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import Phone from "@/components/Phone";
import { COLORS, MODELS } from "@/lib/configuration-options";

function configurationStatusLogic(
  configuration: Awaited<ReturnType<typeof getUserConfigurations>>[0],
) {
  if (configuration.order === null || configuration.order.isPaid === false)
    return "not-ordered";
  return "ordered";
}

function ConfigurationCard({
  configuration,
}: {
  configuration: Awaited<ReturnType<typeof getUserConfigurations>>[0];
}) {
  return (
    <div className="flex w-full gap-4 divide-x-2 rounded-lg border bg-background px-6 py-3 shadow-sm">
      <Phone
        imgSrc={configuration.croppedImgUrl!}
        smallerRadius={true}
        backgroundColor={
          COLORS.find((color) => color.value === configuration.caseColor)!
            .twClass
        }
        className="z-50 w-24 sm:w-36"
      />
      <div className="ml-2 flex flex-1 flex-col pl-4">
        <p className="my-2 self-center font-semibold">
          {
            MODELS.find((model) => model.value === configuration.caseModel)!
              .label
          }
          , {configuration.caseType} case, {configuration.caseFinish} finish
        </p>
        {configurationStatusLogic(configuration) === "ordered" ? (
          <>
            <p className="text-sm text-muted-foreground">
              Ordered on: {configuration.order!.updatedAt.toDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Status:{" "}
              {configuration.order!.status.charAt(0).toUpperCase() +
                configuration.order!.status.slice(1)}
            </p>
            <p className="text-sm text-muted-foreground">
              Order ID: {configuration.order!.id}
            </p>
            <p className="text-sm text-muted-foreground">
              Contact e-mail: {configuration.userEmail}
            </p>
            <p className="mt-3 font-semibold">Delivery details</p>
            <p>Name: {configuration.order!.shippingAddress!.name}</p>
            <p>
              City: {configuration.order!.shippingAddress!.city},{" "}
              {configuration.order!.shippingAddress!.postalCode}
            </p>
            <p>Address: {configuration.order!.shippingAddress!.line1}</p>
          </>
        ) : (
          <>
            <p>Status: {configurationStatusLogic(configuration)}</p>
            <div className="grid grid-cols-2 gap-8">
              <Button variant="outline" className="gap-2">
                <Pencil size={18} />
                Modify design
              </Button>
              <Button className="gap-2">
                <ShoppingCart size={18} />
                Order
              </Button>
            </div>
          </>
        )}
      </div>
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
      <div className="flex flex-col gap-4">{configurationCards}</div>
    </FullWidthWrapper>
  );
}
