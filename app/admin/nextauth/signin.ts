"use server";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
export async function githubSignin() {
  await signIn("github");
}
export async function signInS(formdata) {
  //  return await signIn("credentials", formdata);
  try {
    const result = await signIn("credentials", formdata);
    console.log("signIns result", result);
  } catch (error) {
    // console.log("signInS error received",error, error.message,error.type, isRedirectError(error));
    const errorType = error?.message;
    if (isRedirectError(error)) return "success";
    if (error.type == "CredentialsSignin") {
      return "login error";
    }
    //just pass the status of login to client login page. let it handle notice and redirect .as server side is hard to popup notice.
    switch (error.type) {
      case "NEXT_REDIRECT":
        return "success"; //redirect('/admin');
      case "CredentialsSignin":
        return "wrong pwd try again";
      //redirect ('nextauth');
    }
  }
}

export async function signOutS() {
  return await signOut({redirectTo:"/contact"});
}
