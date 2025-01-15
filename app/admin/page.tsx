//import styles from "./admin.module.css";

import Link from "next/link";
import Register from "./register";
//import LoginPage from "./login";
import { signOutS } from "./nextauth/signin";
import { auth } from "@/auth";
import Login from './login/page'

export default async function AdminPage() {
  //const loggedIn = true;
  const session = await auth();
  console.log("admin page", session);
  const editChoice =   <div className="relative  ">
      <p> manage/edit </p>
      <Link href="admin/editProduct" className="mr-4">
        product</Link>
      <Link href="admin/editproject"> project</Link>
      </div>
  const signOut =<form
  action={async () => {
    "use server";
    await signOutS();
  }}
>
  <button type="submit">SignOut</button>
</form>
  return (
    <>
        <div>
          <br />
        {session?.user ? (
          <div>Signed In as {session.user.name} 
          {editChoice}
          {signOut}
          </div>
        ) : (
          <div>Not sign in
          <Login/>        
          <Register />
 </div>

        )}
        
        <br />
      </div>
    </>
  );
}
