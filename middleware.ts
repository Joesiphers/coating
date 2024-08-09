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
    const newUrl = new URL("/contact", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})