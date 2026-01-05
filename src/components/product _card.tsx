"use client";

import Image from "next/image";
import type { Product } from "@/interfaces/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, decrement } from "@/store/slices/cart_slice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.cart.items.find((i) => i.id === product.id)
  );

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="relative">
        <span className="absolute top-1 left-1 z-10 rounded bg-blue-600 px-1.5 py-0.5 font-bold text-[10px] text-white">
          10% OFF
        </span>

        <div className="relative h-32 w-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>

      <p className="mt-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-semibold text-[10px]">
        ⏱ 10 MINS
      </p>

      <p className="mt-1 line-clamp-2 font-medium text-sm">{product.title}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-sm">₹{product.price}</span>

        {!item ? (
          <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className="rounded-md border border-green-600 px-3 py-1 font-semibold text-green-600 text-sm"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-md border border-green-600 bg-green-600 text-white">
            <button
              type="button"
              onClick={() => dispatch(decrement(product.id))}
              className="px-2 text-lg"
            >
              −
            </button>
            <span className="font-bold text-sm">{item.qty}</span>
            <button
              type="button"
              onClick={() => dispatch(addToCart(product))}
              className="px-2 text-lg"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
