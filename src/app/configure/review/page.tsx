import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { isValidUUID } from "@/lib/utils";
import { getConfiguration } from "@/db/queries";
import Phone from "@/components/Phone";

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
    <div>
      {" "}
      <Phone className="w-52 md:w-60" imgSrc={configuration.croppedImgUrl} />
    </div>
  );
}
