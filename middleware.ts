/*new Authjs remove middleware
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth; // or auth in auth.ts ?

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

/*
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};*/
export { auth as middleware } from "@/auth" //Authjs.dev 5.0 beta