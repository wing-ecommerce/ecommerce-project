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
      gender?: string;
      dateOfBirth?: string;
      phone?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    googleId?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    gender?: string;
    dateOfBirth?: Date;
    phone?: string;
  }
}