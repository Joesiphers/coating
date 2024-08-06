"use server";
import { signIn, signOut } from "@/auth";

export async function signInGithub() {
  await signIn("github", {redirectTo:"/admin"});
}
export async function signInGoogle() {
  await signIn("google");
}
export async function signOutS() {
  return await signOut();
}
