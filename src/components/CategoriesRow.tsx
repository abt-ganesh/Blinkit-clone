"use client";

import Image from "next/image";

const categories = [
  { name: "Milk", img: "/Milk.jpg" },
  { name: "Vegetables", img: "/vegetables.jpg" },
  { name: "Fruits", img: "/fruits.jpg" },
  { name: "Snacks", img: "/snacks.jpg" },
  { name: "Drinks", img: "/drinks.jpg" },
  { name: "Bakery", img: "/backery.jpg" },
];

export default function CategoriesRow() {
  return (
    <section className="w-full bg-white px-4 md:px-8">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto py-6 md:grid md:grid-cols-6 md:gap-8 lg:grid-cols-6">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            className="group flex min-w-[80px] cursor-pointer flex-col items-center gap-2 transition-transform active:scale-95"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[#F8F8F8] md:h-28 md:w-full">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 80px, 200px"
                priority={index < 6}
              />
            </div>

            <p className="text-center font-semibold text-gray-800 text-xs md:text-sm">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
