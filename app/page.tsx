import Image from "next/image";
import { Joan } from "next/font/google";

const inter = Joan({ subsets: ["latin"], weight: "400", display: "swap" });

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-500">
      <main className="flex flex-col max-w-7xl w-full flex-1 px-6 bg-slate-300">
        <h1 className="text-6xl font-bold text-black">test</h1>
      </main>
    </div>
  );
}
