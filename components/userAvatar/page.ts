import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();
  if (!session) {
    return "error";
  }
  console.log("auth UserAvatar session", session);
}
