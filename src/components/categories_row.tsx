"use client";

import Image from "next/image";
import { useCategories } from "@/hooks/use_categories";

interface CategoriesRowProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoriesRow({ selectedCategory, onSelectCategory }: CategoriesRowProps) {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-20 w-16 shrink-0 animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-3 py-4 md:px-6">
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pt-2 pb-2 md:grid md:grid-cols-8 md:gap-6 lg:grid-cols-10">

        <div
          onClick={() => onSelectCategory(null)}
          className="group flex min-w-[72px] cursor-pointer flex-col items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20 ${selectedCategory === null ? 'bg-green-100 ring-2 ring-green-600' : 'bg-blue-50'
            }`}>
            <span className={`font-black text-[10px] md:text-xs ${selectedCategory === null ? 'text-green-700' : 'text-slate-600'
              }`}>ALL</span>
          </div>
          <p className={`max-w-[72px] text-center font-medium text-[10px] leading-tight md:text-xs ${selectedCategory === null ? 'text-green-700' : 'text-slate-700'
            }`}>
            All
          </p>
        </div>

        {categories?.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className="group flex min-w-[72px] cursor-pointer flex-col items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <div className={`relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-50 md:h-20 md:w-20 ${selectedCategory === cat.slug ? 'ring-2 ring-green-600' : ''
              }`}>
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1.5"
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>

            <p className={`line-clamp-2 max-w-[72px] text-center font-medium text-[10px] leading-tight md:text-xs ${selectedCategory === cat.slug ? 'text-green-700' : 'text-slate-700'
              }`}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
