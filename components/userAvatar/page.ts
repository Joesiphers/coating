import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function UserAvatar():Promise<string|null|undefined > {
  const session   = await auth();
  if (!session) {
    return null
  }
    console.log("auth UserAvatar session", session.user);
return session?.user?.image

}
