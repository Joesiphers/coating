import { signInGithub, signInGoogle } from "./signin";
import { signIn,auth } from "@/auth";
import UserAvatar from "@/components/userAvatar/page";


export default async function Contact() {
  const avatar=await UserAvatar();
  console.log("avatar", avatar?.toString())
  const session =await auth()
  const user =session?.user
  
  return (
    <div className="">
      <div>
        <p className="text-4xl m-2">
          contact GuangZhou WanWei email : joe@wwin.cn
        </p>
        <p>SignIn with {user?.name} </p>
        {avatar? <img src={avatar.toString()} alt="avatar" />:null }
      </div>
      <div>
        <p className="text-4xl m-2">Google</p>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Google</button>
        </form>
      </div>
      <div>
        <p className="text-4xl m-2">Github</p>
        <form action={signInGithub}>
          <button type="submit">signInGithub</button>
        </form>
      </div>
      <div>
        <p className="text-4xl m-2">Github</p>
        <form action={async () => {
            "use server";
            await signIn("github");
          }}>
          <button type="submit">GitHub SignIn</button>
        </form>
      </div>
    </div>
  );
}
