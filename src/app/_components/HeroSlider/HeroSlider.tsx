"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  "https://images.unsplash.com/photo-1618354691323-5d4b4a28f0a7?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1607083206968-13611e3d7a12?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1616627988853-8386ebadc177?auto=format&fit=crop&w=1500&q=80",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`slide-${i}`}
            fill
            className="object-cover"
            priority={i === 0} // أول صورة تبقى preload
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
