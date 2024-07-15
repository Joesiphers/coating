"use server";
import { signIn } from "@/auth-old";

export default async function action() {
  return await signIn("github");
}
