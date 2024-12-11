import type { DefaultSession } from "next-auth";
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
