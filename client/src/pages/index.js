import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AuthLayout from "@/components/auth/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className=" flex flex-col overflow-hidden bg-white">
      <h1> Headeer</h1>
    </div>
  );
}
