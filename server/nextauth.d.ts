import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      jwt: string;
      isTeacher: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    jwt: string;
  }
}
