"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type MySwiperProps = {
  images: string[];
  slidesPerView?: number;
  spaceBetween?: number;
  height?: string;
};

export default function MySwiper({
  images,
  slidesPerView = 3,
  spaceBetween = 10,
  height = "h-64",
}: MySwiperProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={true} // يعمل loop
      autoplay={{
        delay: 1000, // كل 2.5 ثانية
        disableOnInteraction: false, // يفضل يكمل بعد ما المستخدم يحرك
      }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className={`w-full ${height} object-cover rounded-lg`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
