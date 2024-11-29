import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-end items-center h-[60px] bg-[#04092C] gap-5 px-5 ">
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>Event</Link>
      <Link href={"/about/profile"}>Cart</Link>
      <Link href={"/user"}>Login</Link>
      <Link href={"/user"}>Sign Up</Link>
    </div>
  );
}
