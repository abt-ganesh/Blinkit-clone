"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert("Signup successful! You can now login.");
        window.location.href = "/login";
      } else {
        const data = await res.json();
        alert(`Signup failed: ${data.message}`);
      }
    } catch (_error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-3xl text-gray-900">Sign Up</h2>
          <p className="text-gray-500 text-sm">
            Create an account to get started
          </p>
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
              placeholder="Create a password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-brand">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link-brand">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
