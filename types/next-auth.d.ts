import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      googleId: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
  }

  interface User {
    id: string;
    email: string;
    googleId?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    googleId?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }
}