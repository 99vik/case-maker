import FullWidthWrapper from "@/components/FullWidthWrapper";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <FullWidthWrapper className="my-12 grid grid-cols-3 gap-5 text-zinc-700">
        <div className="col-span-2 space-y-8">
          <h1 className="text-6xl font-bold leading-tight text-black">
            Your Image on a<br /> <span className="text-primary">Custom</span>{" "}
            Phone Case
          </h1>
          <p className="text-lg">
            Capture your favorite memories with your own,{" "}
            <span className="font-semibold">one-of-one</span> phone case.
            CaseMaker allows you to protect your memories, not just your phone
            case.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center justify-start gap-2 text-sm">
              <Check size={25} strokeWidth={2} className="text-primary" />
              High-quality, durable material
            </li>
            <li className="flex items-center justify-start gap-2 text-sm">
              <Check size={25} strokeWidth={2} className="text-primary" />5 year
              print guarantee{" "}
            </li>
            <li className="flex items-center justify-start gap-2 text-sm">
              <Check size={25} strokeWidth={2} className="text-primary" />
              Modern iPhone models supported
            </li>
          </ul>
          <div className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              <Image
                height={100}
                width={100}
                className="size-10 rounded-full border-2 border-white"
                src="/users/user-1.png"
                alt="user image"
              />
              <Image
                height={100}
                width={100}
                className="size-10 rounded-full border-2 border-white"
                src="/users/user-2.png"
                alt="user image"
              />
              <Image
                height={100}
                width={100}
                className="size-10 rounded-full border-2 border-white"
                src="/users/user-3.png"
                alt="user image"
              />
              <Image
                height={100}
                width={100}
                className="size-10 rounded-full border-2 border-white"
                src="/users/user-5.jpg"
                alt="user image"
              />
              <Image
                height={100}
                width={100}
                className="size-10 rounded-full border-2 border-white"
                src="/users/user-4.jpg"
                alt="user image"
              />
            </div>
            <div>
              <div className="flex">
                <Star size={15} className="fill-primary text-primary" />
                <Star size={15} className="fill-primary text-primary" />
                <Star size={15} className="fill-primary text-primary" />
                <Star size={15} className="fill-primary text-primary" />
                <Star size={15} className="fill-primary text-primary" />
              </div>
              <p>
                <span className="font-semibold">1.250</span> happy customers
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-500">hello</div>
      </FullWidthWrapper>
    </main>
  );
}
