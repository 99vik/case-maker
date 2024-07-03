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
      <section className="bg-background shadow-[0_0_20px_10px_rgba(255,255,255)]">
        <FullWidthWrapper className="flex flex-col gap-10 py-6">
          <h2 className="text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-primary">
            What our customers say
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    height={100}
                    width={100}
                    className="size-10 rounded-full border-2 border-white"
                    src="/users/user-1.png"
                    alt="user image"
                  />
                  <div className="">
                    <p className="font-semibold">Jonathan</p>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <Check
                        size={20}
                        strokeWidth={2.5}
                        className="text-primary"
                      />
                      Verified customer
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                </div>
                {/* <h2 className="text-balance text-center text-5xl font-semibold leading-tight tracking-tight text-primary"> */}

                <p className="text-balance leading-loose">
                  &quot;The case feels durable and I even got a compliment on
                  the design. Had the case for two and a half months now and the
                  image is super clear , on the case I had before, the image
                  started fading into yellow-ish color after a couple weeks.
                  Love it.&quot;
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    height={100}
                    width={100}
                    className="size-10 rounded-full border-2 border-white"
                    src="/users/user-2.png"
                    alt="user image"
                  />
                  <div className="">
                    <p className="font-semibold">Jane</p>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <Check
                        size={20}
                        strokeWidth={2.5}
                        className="text-primary"
                      />
                      Verified customer
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                </div>

                <p className="text-balance leading-loose">
                  &quot;I&apos;ve been using this phone case for three months
                  now, and I couldn&apos;t be happier with it. The build quality
                  is exceptional, giving off a sturdy and robust feel that I
                  trust to protect my phone. The design has garnered several
                  compliments from friends and coworkers alike, which is always
                  a nice bonus. I absolutely love it! &quot;
                </p>
              </div>
            </div>
            <div className="max-sm:hidden">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    height={100}
                    width={100}
                    className="size-10 rounded-full border-2 border-white"
                    src="/users/user-4.jpg"
                    alt="user image"
                  />
                  <div className="">
                    <p className="font-semibold">John</p>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <Check
                        size={20}
                        strokeWidth={2.5}
                        className="text-primary"
                      />
                      Verified customer
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                </div>

                <p className="text-balance leading-loose">
                  &quot;I&apos;ve been using this phone case for four months
                  now, and I&apos;m impressed. The durability is outstanding,
                  offering a solid and reliable for my phone. The sleek design
                  has received numerous compliments, which adds to my
                  satisfaction. Unlike my previous case that wore out quickly,
                  this one still looks as new as the day I bought it. I highly
                  recommend it! &quot;
                </p>
              </div>
            </div>
            <div className="max-sm:hidden">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    height={100}
                    width={100}
                    className="size-10 rounded-full border-2 border-white"
                    src="/users/user-3.png"
                    alt="user image"
                  />
                  <div className="">
                    <p className="font-semibold">Olivia</p>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <Check
                        size={20}
                        strokeWidth={2.5}
                        className="text-primary"
                      />
                      Verified customer
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                  <Star size={15} className="fill-primary text-primary" />
                </div>

                <p className="text-balance leading-loose">
                  &quot;I&apos;ve had this phone case for nearly five months,
                  and it has exceeded all my expectations. The case feels
                  incredibly durable and provides excellent protection for my
                  phone. I couldn&apos;t be more pleased with my purchase and
                  highly recommend it to anyone looking for both style and
                  durability. &quot;
                </p>
              </div>
            </div>
          </div>
        </FullWidthWrapper>
      </section>
      <h2 className="mb-8 text-center text-4xl font-semibold text-primary">
        What our customers are buying
      </h2>

      <ShowcaseParallax />
      <div className="h-screen" />
    </main>
  );
}
