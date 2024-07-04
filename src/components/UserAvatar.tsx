import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  imageUrl,
}: {
  imageUrl: string | null | undefined;
}) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
