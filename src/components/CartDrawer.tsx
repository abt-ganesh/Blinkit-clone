"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, decrement } from "@/store/slices/cartSlice";
import { closeCart } from "@/store/slices/uiSlice";


export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { cartOpen } = useAppSelector((s) => s.ui);
  const items = useAppSelector((s) => s.cart.items);

  const totalPrice = Number(
    items.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2)
  );
  const deliveryCharge = totalPrice > 500 ? 0 : 25;

  if (!cartOpen) return null;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="flex-1" onClick={() => dispatch(closeCart())} />

      <aside className="flex h-full w-full flex-col bg-[#F5F7FD] md:w-[380px]">
        <div className="flex items-center justify-between bg-white px-4 py-4 shadow-sm">
          <h2 className="font-extrabold text-lg">My Cart</h2>
          <button
            type="button"
            onClick={() => dispatch(closeCart())}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-20">
          <div className="m-4 rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <p className="font-bold text-sm">Delivery in 8 minutes</p>
                <p className="text-gray-500 text-xs">Shipment 1 of 1</p>
              </div>
            </div>
          </div>

          <div className="m-4 rounded-xl bg-white p-2 shadow-sm">
            {items.length === 0 ? (
              <p className="py-10 text-center text-gray-500">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b p-3 last:border-0"
                >
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 font-medium text-sm">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs">
                      ₹{formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center rounded-md bg-[#0c831f] text-white">
                    <button
                      type="button"
                      onClick={() => dispatch(decrement(item.id))}
                      className="px-2 py-1 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="min-w-[20px] text-center font-bold text-xs">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(item))}
                      className="px-2 py-1 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="m-4 rounded-xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-bold text-sm">Bill Details</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${formatPrice(deliveryCharge)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-sm">
                  <span>Grand Total</span>
                  <span>₹{formatPrice(totalPrice + deliveryCharge)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="fixed right-0 bottom-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:w-[380px]">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg bg-[#0c831f] p-4 text-white shadow-lg transition-transform active:scale-[0.98]"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-bold text-sm">
                  ₹{formatPrice(totalPrice + deliveryCharge)}
                </span>

                <span className="font-medium text-[10px] uppercase tracking-wider">
                  Total
                </span>
              </div>
              <span className="flex items-center gap-1 font-bold">
                Proceed to Pay
              </span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
