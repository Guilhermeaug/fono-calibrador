import { AuthOptions, getServerSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { revalidatePath } from "next/cache";
import { LoginPayload, StrapiError } from "./types";
import { STRAPI } from "./strapi";
import { FORM_TYPE } from "@/app/(content)/register/constants";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (credentials == null) return null;
          const { user, jwt, ...rest } = await login(credentials);
          console.warn({ user, jwt, ...rest });
          revalidatePath("/", "layout");
          return { ...user, jwt };
        } catch (e) {
          const error = (e instanceof Promise ? await e : e) as StrapiError;
          throw error.error.message
            ? new Error(error.error.message)
            : new Error("Unknown Error");
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.jwt = token.jwt as string;
      session.user.name = token.name as string;
      session.user.isTeacher = token.isTeacher as boolean;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = !!user;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
};

async function login(loginPayload: LoginPayload) {
  return await STRAPI.login(loginPayload);
}

async function signUp(data: FORM_TYPE) {
  try {
    const res = await STRAPI.signUp(data);
    return res as User;
  } catch (error: any) {
    return error;
    // const status = error.status;
    // if (status === 400) {
    //   return error;
    // }
    // return {
    //   data: null,
    //   error: {
    //     status: status,
    //     name: "UnknownError",
    //     message: "An Unknown Error Occurred",
    //     details: {},
    //   },
    // };
  }
}

export const AUTH = {
  getServerSession: () => getServerSession(authOptions),
  login,
  signUp,
};
