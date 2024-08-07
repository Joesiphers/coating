import Navbar from "../navbar/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // console.log(auth());
  return (
    <div className="fixed justify-between flex md:block top-0 left-0 z-50 w-full  p-1 bg-white ">
      <Link href="/">
        <div className="w-full justify-left relative z-20 px-2 mt-2 inline-flex">
          <Image src="/image/logo.jpg" alt="WanWei" width={25} height={25} />
          <h1> GuangZhou WanWei</h1>
        </div>
      </Link>
      <div className="pr-2 relative top-4 md:top-0 block text-zinc=950 z-20 text-center">
        <Navbar />
      </div>
    </div>
  );
}
