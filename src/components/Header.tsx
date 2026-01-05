'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openCart } from '@/store/slices/ui_slice'

export default function Header() {
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()

  const items = useAppSelector(state => state.cart.items)
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-8xl items-center gap-6 px-6 py-4">
        <Link href="/" className="font-black text-4xl tracking-tighter">
          <span className="text-yellow-400">blink</span>
          <span className="text-green-600">it</span>
        </Link>

        <div className="ml-4 hidden cursor-pointer md:block">
          <p className="font-bold text-xl">Delivery in 10 minutes</p>
          <p className="text-gray-600 text-sm">
            Home · Sector 21, Pune ▾
          </p>
        </div>

        <div className="relative flex-1">
          <span className="absolute top-2.5 left-3 text-gray-800">🔍</span>
          <input
            placeholder='Search "milk"'
            className="w-full rounded-lg bg-gray-200 py-2.5 pr-3 pl-10 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          {status === 'loading' ? null : session ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 font-medium text-sm"
              >
                👤 {session.user.name ?? 'User'}
              </button>

              <div className="absolute top-8 right-0 hidden w-40 rounded-md border bg-white shadow-md group-hover:block">
                <Link
                  href="/auth/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    signOut({ callbackUrl: '/' })
                  }
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="hidden font-medium text-sm md:block"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => dispatch(openCart())}
            className="flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-white active:scale-95"
          >
            🛒
            {items.length ? (
              <div className="text-left leading-none">
                <p className="font-bold text-[10px] uppercase">
                  {items.length} items
                </p>
                <p className="font-bold text-xs">
                  ₹{total.toFixed(2)}
                </p>
              </div>
            ) : (
              <span className="font-bold text-sm">My Cart</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
