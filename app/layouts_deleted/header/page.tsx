import Navbar from "../../components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // console.log(auth());
  return (
    <div className="fixed z-50 w-full h-14 p-1 bg-white ">
      <Link href="/">
        <div className="w-full justify-left relative z-20 px-4 m-2 inline-flex">
          <Image src="/image/logo.jpg" alt="WanWei" width={25} height={25} />
          <h1> GuangZhou WanWei</h1>
        </div>
      </Link>
      <div className="absolute top-0 right-0 block text-zinc=950 z-20 text-center">
        <Navbar />
      </div>
    </div>
  );
}
