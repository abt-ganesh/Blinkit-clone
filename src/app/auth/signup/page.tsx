'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleSignup() {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    users.push({
      id: crypto.randomUUID(),
      ...form,
    })

    localStorage.setItem('users', JSON.stringify(users))
    router.push('/auth/login')
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 font-bold text-xl">Create Account</h1>

      <input
        className="mb-2 w-full border p-2"
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="mb-2 w-full border p-2"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="mb-4 w-full border p-2"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button type='button'
        onClick={handleSignup}
        className="w-full rounded bg-green-700 py-2 text-white"
      >
        Sign Up
      </button>
    </div>
  )
}
