import { addUser } from "@/api/updateAPI";
import bcrypt from "bcrypt";
export default async function Register() {
  const register = async (data) => {
    "use server";
    //console.log("registering", data.get("email"), data.get("password"), data);
    const saltrount = 11;
    const hashedPassword = await bcrypt.hash(data.get("password"), saltrount);
    const res = await addUser(data.get("email"), hashedPassword);
    console.log("add hashing user pass",res)
  };
  return (
    <div className="mt-12">
      <p>Register</p>
      <form action={register}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          className="border-2 border-solid m-2"
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          className="border-2 border-solid m-2"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
