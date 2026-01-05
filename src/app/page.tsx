"use client";

import CategoriesRow from "@/components/CategoriesRow";
import OfferBanners from "@/components/OfferBanners";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { data, isLoading } = useProducts();

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
      <CategoriesRow />

      <section className="px-4 py-6 md:px-10">
        <h2 className="mb-4 font-bold text-gray-800 text-lg md:text-xl">
          Bestsellers
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {data?.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
