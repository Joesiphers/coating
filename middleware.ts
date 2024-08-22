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
//export { auth as middleware } from "@/auth" //Authjs.dev 5.0 beta

import { auth } from "@/auth"
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    //console.log("middleware unauth")
    // if no login and try to access Admin folder, will be redirect to /login
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})