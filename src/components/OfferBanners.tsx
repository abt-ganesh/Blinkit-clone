"use client";

import Image from "next/image";

const banners = ["/poster.jpg", "/poster2.jpg", "/poster3.jpg"];

export default function OfferBanners() {
  return (
    <section className="w-full bg-white px-4 py-4 md:px-8">
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-3">
        {banners.map((src, i) => (
          <div
            key={i}
            className="relative h-44 min-w-[90%] flex-shrink-0 snap-center overflow-hidden rounded-2xl md:h-56 md:min-w-full lg:h-64"
          >
            <Image
              src={src}
              alt={`Exclusive Offer ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 90vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
