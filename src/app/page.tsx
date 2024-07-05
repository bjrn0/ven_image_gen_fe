"use client";

import { DisplayImage } from "./components/DisplayImage";
import { Navbar } from "./components/Navbar";
import { PromptItems } from "./components/PromptItems";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-row h-full w-full max-w-6xl">
        <PromptItems />
        <DisplayImage />
      </div>
    </main>
  );
}
