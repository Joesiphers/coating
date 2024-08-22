
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
import Google from "next-auth/providers/google"

export const {handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google],
  pages: {      signIn: '/login',   },   //to specify when login goest to  custom login page, not default nextAuth login page.

// check auth in route /dashboard ????//
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session?.user){ session.user.id = token.id}
      return session
    },
    /*authorized({ auth, request: { nextUrl } }) {
      
      console.log("auth.ts authoried", auth?.user)
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
       else if (isLoggedIn) {
       return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },      */
  /* authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log("auth.ts authoried 2333", auth?.user)

      return !!auth
    },*/

  },

 
})