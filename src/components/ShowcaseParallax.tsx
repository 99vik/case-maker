"use client";

import { useEffect, useRef } from "react";
import FullWidthWrapper from "./FullWidthWrapper";
import Phone from "./Phone";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";

const img2 = "/testimonials/2.jpg";
const img3 = "/testimonials/3.jpg";
const img4 = "/testimonials/4.png";
const img5 = "/testimonials/5.jpg";
const img6 = "/testimonials/6.png";
const img7 = "/testimonials/7.png";

export default function ShowcaseParallax() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-500, 300]);

  return (
    <FullWidthWrapper
      ref={container}
      className="pointer-events-none relative grid h-[60vh] touch-none select-none grid-cols-3 justify-items-center overflow-hidden rounded-xl border-b px-0 sm:px-0 md:h-[120vh] md:px-0 lg:h-[140vh]"
    >
      <div className="absolute top-0 z-50 h-16 w-full bg-gradient-to-b from-secondary to-transparent" />

      <Column images={[img2, img5, img7, img4]} y={y1} />
      <Column images={[img3, img4, img2, img2, img6]} y={y2} />
      <Column images={[img6, img7, img5, img4]} y={y3} />
    </FullWidthWrapper>
  );
}

function Column({ images, y }: { images: string[]; y: MotionValue }) {
  return (
    <motion.div style={{ y }} className="space-y-4">
      {images.map((image, index) => (
        <div className="rounded-xl border bg-background p-2 md:p-4" key={index}>
          <Phone imgSrc={image} className="z-50 w-24 sm:w-40 md:w-48 lg:w-64" />
        </div>
      ))}
    </motion.div>
  );
}
