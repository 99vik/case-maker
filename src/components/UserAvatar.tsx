import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function UserAvatar({
  imageUrl,
}: {
  imageUrl: string | null | undefined;
}) {
  return (
    <Avatar className="size-9">
      {/* @ts-ignore */}
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="border border-foreground/30 bg-secondary">
        <User size={18} className="text-foreground/70" />
      </AvatarFallback>
    </Avatar>
  );
}
