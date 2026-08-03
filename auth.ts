import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { getDb } from "@/lib/mongodb"
import type { ObjectId } from "mongodb"

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8) })

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null
        const email = parsed.data.email.toLowerCase()
        const db = await getDb()
        const users = db.collection("users")
        let user = await users.findOne<{ email: string; passwordHash: string; role: string }>({ email }) as { _id: ObjectId; email: string; passwordHash: string; role: string } | null

        if (!user && email === process.env.ADMIN_EMAIL?.toLowerCase() && parsed.data.password === process.env.ADMIN_PASSWORD) {
          const passwordHash = await bcrypt.hash(parsed.data.password, 12)
          const inserted = await users.insertOne({ email, passwordHash, role: "admin", createdAt: new Date() })
          user = { _id: inserted.insertedId, email, passwordHash, role: "admin" }
        }
        if (!user || user.role !== "admin" || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null
        return { id: user._id.toString(), email: user.email, role: "admin" }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) { if (user) token.role = "admin"; return token },
    session({ session, token }) { if (session.user) session.user.role = token.role as string; return session },
  },
})
