'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!res?.error) router.push('/')
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 font-bold text-xl">Login</h1>

      <input
        className="mb-2 w-full border p-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mb-4 w-full border p-2"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button type='button'
        onClick={handleLogin}
        className="w-full rounded bg-green-700 py-2 text-white"
      >
        Login
      </button>
    </div>
  )
}
