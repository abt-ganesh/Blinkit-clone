"use client";

import { useState } from "react";
import CategoriesRow from "@/components/categories_row";
import OfferBanners from "@/components/offer_banners";
import ProductCard from "@/components/product _card";
import { useProducts } from "@/hooks/use_products";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading } = useProducts(selectedCategory);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <p className="font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <OfferBanners />
      <CategoriesRow
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="px-4 py-6 md:px-10">
        <h2 className="mb-4 font-bold text-gray-800 text-lg md:text-xl">
          {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}` : 'Bestsellers'}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {data?.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
