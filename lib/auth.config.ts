import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

// Define Google Profile interface
interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          const googleProfile = profile as GoogleProfile;
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (existingUser) {
            // Update existing user with Google info
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                googleId: account.providerAccountId,
                profilePicture: user.image || undefined,
                firstName: googleProfile?.given_name || user.name?.split(' ')[0] || undefined,
                lastName: googleProfile?.family_name || user.name?.split(' ').slice(1).join(' ') || undefined,
              },
            });
          } else {
            // Create new user
            await prisma.user.create({
              data: {
                email: user.email!,
                googleId: account.providerAccountId,
                firstName: googleProfile?.given_name || user.name?.split(' ')[0] || undefined,
                lastName: googleProfile?.family_name || user.name?.split(' ').slice(1).join(' ') || undefined,
                profilePicture: user.image || undefined,
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // First time JWT is created
      if (account && user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.googleId = dbUser.googleId || undefined;
          token.firstName = dbUser.firstName || undefined;
          token.lastName = dbUser.lastName || undefined;
          token.profilePicture = dbUser.profilePicture || undefined;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Add user info to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.googleId = token.googleId as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.profilePicture = token.profilePicture as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/', // Redirect to home page for sign in
    error: '/', // Error page
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};