import { auth } from "@/auth";
import { getConfiguration } from "@/db/queries";
import { isValidUUID } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import DesignConfigurator from "./_components/DesignConfigurator";

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

  return (
    <DesignConfigurator
      configId={configuration.id}
      img={{ aspect: configuration.aspectRatio, src: configuration.imgUrl }}
    />
  );
}
