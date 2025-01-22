import Header from "@/components/header/Header";
import HeaderBottom from "@/components/header/HeaderBottom";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});


export default function Home() {
  return (
      <main>
       <Header/>
       <HeaderBottom/>
      </main>
  );
}
