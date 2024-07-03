import FullWidthWrapper from "@/components/FullWidthWrapper";
import Phone from "@/components/Phone";
import ShowcaseParallax from "@/components/ShowcaseParallax";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
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
      <section className="bg-background">
        <FullWidthWrapper className="flex flex-col gap-10 py-6">
          <h2 className="text-balance text-center text-4xl font-bold leading-tight tracking-tight text-foreground">
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
      <section>
        <h2 className="my-10 text-balance text-center text-4xl font-bold leading-tight tracking-tight text-foreground">
          What our customers are buying
        </h2>
        <ShowcaseParallax />
      </section>
      <section className="bg-background pb-10">
        <FullWidthWrapper className="flex flex-col items-center gap-8 py-6">
          <h2 className="max-w-[500px] text-balance text-center text-4xl font-bold leading-tight tracking-tight text-foreground">
            Upload your own <span className="text-primary">custom</span> photo
            and get your case <span className="text-primary">now</span>
          </h2>
          <div className="relative flex flex-col gap-20 min-[820px]:flex-row min-[820px]:gap-32">
            <img src="/testimonials/7.png" className="w-56 rounded-sm" />
            <img
              src="/arrow.png"
              className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2 max-[820px]:-translate-y-9 max-[820px]:rotate-90 min-[820px]:w-24"
            />
            <Phone className="z-50 w-56" imgSrc="/testimonials/7.png" />
          </div>
          <Button className="text-md flex gap-2">
            Create your case now
            <ArrowRight strokeWidth={2} size={20} />
          </Button>{" "}
        </FullWidthWrapper>
      </section>
    </main>
  );
}
