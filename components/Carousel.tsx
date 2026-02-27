"use client";

import { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  title: string;
}

export default function Carousel({ images, title }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div className="relative">
      <div className="relative h-96 w-full">
        <Image
          src={images[currentIndex]}
          alt={`${title} - image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Previous image"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Next image"
          >
            ❯
          </button>
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-16 relative border-2 flex-shrink-0 ${
                  idx === currentIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
