import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { isValidUUID } from "@/lib/utils";
import { getConfiguration } from "@/db/queries";
import Phone from "@/components/Phone";
import { CASE_TYPE, COLORS, FINISH, MODELS } from "@/lib/configuration-options";
import { Check } from "lucide-react";

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
    <div className="flex w-full gap-8 py-12">
      <div>
        <Phone
          className="w-52"
          backgroundColor={
            COLORS.find((color) => color.value === configuration.caseColor)!
              .twClass
          }
          imgSrc={configuration.croppedImgUrl}
        />
      </div>
      <div className="h-full flex-1 space-y-1">
        <h1 className="text-3xl font-semibold">
          Your{" "}
          {
            MODELS.find((model) => model.value === configuration.caseModel)
              ?.label
          }
        </h1>
        <div className="flex items-center gap-1">
          <Check size={18} className="text-primary" />
          <p>In stock and ready for shipping</p>
        </div>
        <div className="flex justify-between border-b pb-4">
          <div className="space-y-1 pt-5">
            <h2>Properties</h2>
            <ul className="list-inside list-disc space-y-1 text-foreground/80">
              <li>High-quality, durable material</li>
              <li>5 year print guarantee </li>
              <li>Wireless charging compatible</li>
            </ul>
          </div>
          <div className="space-y-1 pt-5">
            <h2>Your case configuration</h2>
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
                Protection:{" "}
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
        <div className="w-full space-y-1 border-b py-2">
          <div className="flex justify-between">
            <p>Base price</p>
            <p>${(10).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>
              Protection:{" "}
              {
                CASE_TYPE.find((type) => type.value === configuration.caseType)!
                  .label
              }
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
              Finish:{" "}
              {
                FINISH.find(
                  (finish) => finish.value === configuration.caseFinish,
                )!.label
              }
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
                10 +
                CASE_TYPE.find((type) => type.value === configuration.caseType)!
                  .price +
                FINISH.find(
                  (finish) => finish.value === configuration.caseFinish,
                )!.price
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
