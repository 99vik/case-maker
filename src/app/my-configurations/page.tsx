import { auth } from "@/auth";
import FullWidthWrapper from "@/components/FullWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { getUserConfigurations } from "@/db/queries";
import { Check, Pencil, Plus, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import Phone from "@/components/Phone";
import { COLORS, MODELS } from "@/lib/configuration-options";
import Link from "next/link";
import MyConfigurationsButtons from "@/components/MyConfigurationsButtons";
import { cn } from "@/lib/utils";

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
    <div className="flex w-full gap-1 divide-x-2 rounded-lg border bg-background px-2 py-3 shadow-sm md:gap-4 md:px-6">
      <div>
        <Phone
          imgSrc={configuration.croppedImgUrl!}
          smallerRadius={true}
          backgroundColor={
            COLORS.find((color) => color.value === configuration.caseColor)!
              .twClass
          }
          className="z-50 w-24 sm:w-36"
        />
      </div>
      <div className="ml-2 flex flex-1 flex-col pl-2 md:pl-4">
        <p className="my-1 self-center text-sm font-semibold md:my-2 md:text-base">
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
            <p className="hidden text-sm text-muted-foreground md:block">
              Order ID: {configuration.order!.id}
            </p>
            <p className="text-sm text-muted-foreground">
              Contact e-mail: {configuration.userEmail}
            </p>
            <p className="mt-3 text-sm font-semibold md:text-base">
              Delivery details
            </p>
            <p className="text-sm md:text-base">
              Name: {configuration.order!.shippingAddress!.name}
            </p>
            <p className="text-sm md:text-base">
              City: {configuration.order!.shippingAddress!.city},{" "}
              {configuration.order!.shippingAddress!.postalCode}
            </p>
            <p className="text-sm md:text-base">
              Address: {configuration.order!.shippingAddress!.line1}
            </p>
          </>
        ) : (
          <>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-sm md:text-base">
                <Check size={18} className="text-primary" />
                <p>In stock and ready for shipping</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Modify your design or go straight to checkout.
              </p>
            </div>
            <MyConfigurationsButtons configuration={configuration} />
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

  return (
    <FullWidthWrapper className="space-y-2 py-6 lg:py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">My configurations</h1>
        <Link
          className={cn(buttonVariants({ className: "gap-1 md:gap-2" }))}
          href={`/configure/upload`}
        >
          <Plus size={18} />
          Create New Design
        </Link>
      </div>
      <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700"></div>
      <div className="flex flex-col gap-4">{configurationCards}</div>
    </FullWidthWrapper>
  );
}
