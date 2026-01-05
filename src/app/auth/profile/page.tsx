'use client'

import { signOut, useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="font-bold text-xl">My Profile</h1>

      <div className="mt-4 space-y-2">
        <p><b>Name:</b> {session.user.name}</p>
        <p><b>Email:</b> {session.user.email}</p>
      </div>

      <button type='button'
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  )
}
