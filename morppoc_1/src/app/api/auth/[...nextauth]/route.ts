import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verify as argonVerify } from "@node-rs/argon2";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      // IMPORTANT: keys must be "username" and "password"
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        // See what we actually receive:
        // console.log("authorize creds:", creds);

        const email = String(creds?.username || "");
        const password = String(creds?.password || "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const ok = await argonVerify(user.passwordHash, password);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name ?? null };
      },
    }),
  ],
  pages: { signIn: "/signin" },
});

export { handler as GET, handler as POST };
