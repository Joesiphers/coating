import { signInGithub, signInGoogle } from "./signin";
import { signIn } from "@/auth";
import UserAvatar from "@/components/userAvatar/page";
export default async function Tech() {
  await UserAvatar();
  return (
    <div className="">
      <div>
        <p className="text-4xl m-2">
          contact GuangZhou WanWei email : joe@wwin.cn
        </p>
        ?
      </div>
      <div>
        <p className="text-4xl m-2">Google</p>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="sumit">Google</button>
        </form>
      </div>
      <div>
        <p className="text-4xl m-2">Github</p>
        <form action={signInGithub}>
          <button type="sumit">Github</button>
        </form>
      </div>
      <div>
        <p className="text-4xl m-2">Google</p>
        <form action={signInGoogle}>
          <button type="sumit">Google</button>
        </form>
      </div>
    </div>
  );
}
