import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash as argonHash } from "@node-rs/argon2";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await argonHash(password);
  await prisma.user.create({ data: { email, passwordHash } });

  return NextResponse.json({ ok: true });
}
