"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: "/",
    });
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-3xl text-gray-900">Log in</h2>
          <p className="text-gray-500 text-sm">Welcome back to Blinkit-Clone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 text-xs uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 text-xs uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-brand">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            New to Blinkit-Clone?{" "}
            <Link href="/signup" className="link-brand">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
