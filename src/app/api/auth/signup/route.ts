import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/password";
import { createUser, getUserByEmail } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    createUser({
      id: crypto.randomUUID(),
      email,
      password: await hashPassword(password),
      name: email.split("@")[0],
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : String(err);
  return NextResponse.json({ message: "Signup failed", error: message }, { status: 500 });
}

}
