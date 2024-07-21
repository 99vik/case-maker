"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiComponent() {
  const [ismounted, setIsMounted] = useState(false);
  const [clientScreenSize, setClientScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setClientScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setIsMounted(true);
  }, []);

  if (!ismounted) return null;
  return (
    <Confetti
      className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
      recycle={false}
      numberOfPieces={300}
      width={clientScreenSize.width}
      height={clientScreenSize.height}
    />
  );
}
