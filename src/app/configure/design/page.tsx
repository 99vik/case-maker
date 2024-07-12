import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function Page() {
  return (
    <div className="my-6 grid w-full grid-cols-3 gap-2">
      <div className="col-span-2 flex items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-background">
        <div className="w-1/4">
          <AspectRatio ratio={896 / 1831}>
            <Image src="/phone-template.png" fill alt="phone template" />
          </AspectRatio>
        </div>
      </div>
      <div className="bg-blue-500">options</div>
    </div>
  );
}
