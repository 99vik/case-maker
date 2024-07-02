"use client";

import { useEffect, useRef } from "react";
import FullWidthWrapper from "./FullWidthWrapper";
import Phone from "./Phone";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";
const img1 = "/testimonials/1.jpg";

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
      className="relative mb-16 grid h-[60vh] grid-cols-3 justify-items-center overflow-hidden rounded-xl px-0 sm:px-0 md:h-screen md:px-0 lg:h-[120vh]"
    >
      <div className="absolute top-0 z-50 h-16 w-full bg-gradient-to-b from-secondary to-transparent" />
      <div className="absolute bottom-0 z-50 h-16 w-full bg-gradient-to-t from-secondary to-transparent" />

      <Column images={[img1, img1, img1, img1]} y={y1} />
      <Column images={[img1, img1, img1, img1, img1]} y={y2} />
      <Column images={[img1, img1, img1, img1]} y={y3} />
    </FullWidthWrapper>
  );
}

function Column({ images, y }: { images: string[]; y: MotionValue }) {
  return (
    <motion.div style={{ y }} className="space-y-4">
      {images.map((image, index) => (
        <Phone
          key={index}
          imgSrc={image}
          className="w-24 sm:w-40 md:w-48 lg:w-64"
        />
      ))}
    </motion.div>
  );
}
