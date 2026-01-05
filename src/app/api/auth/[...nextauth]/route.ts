import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const users = JSON.parse(
          globalThis.localStorage?.getItem('users') ?? '[]'
        )

        const user = users.find(
          (u: any) =>
            u.email === credentials.email &&
            u.password === credentials.password
        )

        if (!user) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user
      return token
    },

    session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },

  pages: {
    signIn: '/auth/login',
  },
})

export { handler as GET, handler as POST }
