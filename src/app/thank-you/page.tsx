import { auth } from "@/auth";
import { getOrder } from "@/db/queries";
import { isValidUUID } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const { id: orderId } = searchParams;
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/signin");
  if (!orderId || !isValidUUID(orderId)) notFound();

  const order = await getOrder({
    orderId: orderId,
  });

  if (!order || order.configuration?.userEmail !== user.email!) notFound();

  console.log(order);
  return (
    <div>
      <p>thanh you</p>
    </div>
  );
}
