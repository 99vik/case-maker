import FullWidthWrapper from "@/components/FullWidthWrapper";
import Phone from "@/components/Phone";
import ShowcaseParallax from "@/components/ShowcaseParallax";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <FullWidthWrapper className="my-16 grid grid-cols-1 justify-items-center gap-y-16 lg:grid-cols-3 lg:gap-10">
        <div className="col-span-2 space-y-8 max-lg:text-center">
          <h1 className="text-6xl font-bold leading-tight">
            Your Image on a <span className="text-primary">Custom</span> Phone
            Case
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
        <div className="relative flex justify-center">
          <img
            src="/your-image.png"
            className="absolute -top-12 left-56 hidden w-32 select-none sm:block lg:hidden lg:w-40 xl:block"
          />
          <Phone className="w-60" imgSrc="/testimonials/1.jpg" />
        </div>
      </FullWidthWrapper>
      <h2 className="mb-8 text-center text-4xl font-semibold text-primary">
        What our customers are buying
      </h2>
      <ShowcaseParallax />
      <div className="h-screen" />
    </main>
  );
}
