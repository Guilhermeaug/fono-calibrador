"use client";

import * as React from "react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type Props = {
  session: Session | null;
  children?: React.ReactNode;
};

export function SessionProvider({ session, children }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
