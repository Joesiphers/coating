import { signInGithub, signInGoogle } from "./signin";
import { signIn,auth } from "@/auth";
import UserAvatar from "@/components/userAvatar/page";
import CredentialLogin from "./credentialLogin";

export default async function Login() {
  const avatar=await UserAvatar();
  console.log("avatar", avatar?.toString())
  const session =await auth()
  const user =session?.user
  
  return (
    < > 
    <CredentialLogin/>
    <div className="m-auto">
        <p>Or SignIn with {user?.name} </p>
        {avatar? <img src={avatar.toString()} alt="avatar" />:null }
      </div>
    <div className="flex relative h-full justify-center">
      <div className="">
        <p className="text-2xl text-sky-600 m-2">Google</p>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
        <span>  <button className="border-2 rounded border-zinc-800 p-2" type="submit">Google</button></span>
        </form>
      </div>
      <div>
        <p className="text-2xl text-sky-600 m-2">Github</p>
        <form action={signInGithub}>
          <button className="border-2 rounded border-zinc-800 p-2" type="submit">signInGithub </button>
        </form>
        <p>redirect</p>
      </div>
      <div>
        <p className="text-2xl text-sky-600 m-2">Github</p>
        <form action={async () => {
            "use server";
            await signIn("github");
          }}>
          <button className="border-2 rounded border-zinc-800 p-2" type="submit">GitHub </button>
        </form>
      </div>
    </div>
  </>
  );
}


/**    <br/><br/><br/>
    <Link href={{
        pathname:"./",
        query:{modal:true,message:"Please login",content:"login"}
      }}>
      <button>loginModal</button></Link>
       
    <Link href={"/login?modal=true"} className="m-4">
    <button>login Intercept Modal</button></Link>
      
    
    <Link href="./admin/login">login</Link>

    <Link href={"/login?modal=true"} className="m-4">
      <button>login Intercept Modal</button></Link>

      */