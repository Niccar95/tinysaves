import type { DefaultSession } from "next-auth";

// NextAuth already expects a user to have id, name, email and image by default.
//But I had to add a type extension to to add display names to my users.
//I also wanted to use userId instead of id, so I changed it here
declare module "next-auth" {
  interface User {
    id: string;
    displayName: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      displayName?: string | null;
    } & DefaultSession["user"];
  }
}
