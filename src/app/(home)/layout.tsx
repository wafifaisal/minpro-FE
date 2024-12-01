import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
