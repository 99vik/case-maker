import { auth } from "@/auth";
import CreateCheckoutButton from "@/components/CreateCheckoutButton";
import Phone from "@/components/Phone";
import { getConfiguration } from "@/db/queries";
import { CASE_TYPE, COLORS, FINISH, MODELS } from "@/lib/configuration-options";
import { isValidUUID } from "@/lib/utils";
import { Check } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const { id: configId } = searchParams;
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/signin");
  if (!configId || !isValidUUID(configId)) notFound();

  const configuration = await getConfiguration({
    configId: configId,
    userEmail: user.email!,
  });
  if (!configuration) notFound();
  if (!configuration.croppedImgUrl)
    redirect(`/configure/design?id=${configId}`);

  return (
    <div className="flex w-full flex-col gap-8 py-6 lg:flex-row lg:gap-12 lg:py-12">
      <div className="flex flex-col gap-6">
        <div className="space-y-1 lg:hidden">
          <h1 className="text-3xl font-semibold">
            Your custom{" "}
            {
              MODELS.find((model) => model.value === configuration.caseModel)
                ?.label
            }{" "}
            case
          </h1>
          <div className="flex items-center gap-1">
            <Check size={18} className="text-primary" />
            <p>In stock and ready for shipping</p>
          </div>
        </div>
        <Phone
          className="w-52 self-center"
          backgroundColor={
            COLORS.find((color) => color.value === configuration.caseColor)!
              .twClass
          }
          imgSrc={configuration.croppedImgUrl}
        />
      </div>
      <div className="h-full flex-1 space-y-1">
        <h1 className="hidden text-3xl font-semibold lg:block">
          Your custom{" "}
          {
            MODELS.find((model) => model.value === configuration.caseModel)
              ?.label
          }{" "}
          case
        </h1>
        <div className="hidden items-center gap-1 lg:flex">
          <Check size={18} className="text-primary" />
          <p>In stock and ready for shipping</p>
        </div>
        <div className="flex flex-col justify-between space-y-6 border-b border-zinc-300 pb-4 dark:border-zinc-700 md:flex-row md:space-y-0 lg:pt-5">
          <div className="space-y-1">
            <h2 className="font-semibold">Properties</h2>
            <ul className="list-inside list-disc space-y-1 text-foreground/80">
              <li>High-quality, durable material</li>
              <li>5 year print guarantee </li>
              <li>Wireless charging compatible</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold">Your case configuration</h2>
            <ul className="list-inside list-disc space-y-1 text-foreground/80">
              <li>
                Color:{" "}
                {
                  COLORS.find(
                    (color) => color.value === configuration.caseColor,
                  )!.label
                }
              </li>
              <li>
                Phone model:{" "}
                {
                  MODELS.find(
                    (model) => model.value === configuration.caseModel,
                  )!.label
                }
              </li>
              <li>
                Case type:{" "}
                {
                  CASE_TYPE.find(
                    (type) => type.value === configuration.caseType,
                  )!.label
                }
              </li>
              <li>
                Finish:{" "}
                {
                  FINISH.find(
                    (finish) => finish.value === configuration.caseFinish,
                  )!.label
                }
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full space-y-1 border-b border-zinc-300 py-2 dark:border-zinc-700">
          <div className="flex justify-between">
            <p>Base price</p>
            <p>${(11.99).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>
              {
                CASE_TYPE.find((type) => type.value === configuration.caseType)!
                  .label
              }{" "}
              case
            </p>
            <p>
              $
              {CASE_TYPE.find(
                (type) => type.value === configuration.caseType,
              )!.price.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              {
                FINISH.find(
                  (finish) => finish.value === configuration.caseFinish,
                )!.label
              }{" "}
              finish
            </p>
            <p>
              $
              {FINISH.find(
                (finish) => finish.value === configuration.caseFinish,
              )!.price.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-full py-2">
          <div className="flex justify-between font-semibold">
            <p>Total:</p>
            <p>
              $
              {(
                11.99 +
                CASE_TYPE.find((type) => type.value === configuration.caseType)!
                  .price +
                FINISH.find(
                  (finish) => finish.value === configuration.caseFinish,
                )!.price
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-3">
          <CreateCheckoutButton configId={configId} />
        </div>
      </div>
    </div>
  );
}
