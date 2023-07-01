import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {db} from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {NextAuthOptions} from 'next-auth'


const options: NextAuthOptions={
    adapter: PrismaAdapter(db),
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    pages:{
      signIn: '/start'
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
  }

  export default async (req, res) => {
    await NextAuth(req, res, options)
    res.end()
  }

