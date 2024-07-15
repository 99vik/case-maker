import { db } from "@/db";
import { and } from "drizzle-orm";
import DesignConfigurator from "./_components/DesignConfigurator";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { isValidUUID } from "@/lib/utils";

const image = {
  width: 1080,
  height: 1920,
  src: "/testimonials/4.png",
};

const aspect = image.width / image.height;

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

  const configuration = await db.query.configurations.findFirst({
    where: (configuration, { eq }) =>
      and(
        eq(configuration.id, configId),
        eq(configuration.userEmail, user.email!),
      ),
  });
  if (!configuration) notFound();
  console.log(configuration);

  return <DesignConfigurator img={{ aspect: aspect, src: image.src }} />;
}
