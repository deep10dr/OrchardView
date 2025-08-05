// app/page.tsx or components/Page.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const navigator = useRouter();
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/background.jpg"
        alt="Fruit market background"
        fill
        className="object-cover"
        quality={100}
        priority
      />

      {/* Centered Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="backdrop-blur-md bg-white/30 shadow-2xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center ">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 drop-shadow-md">
            Search the fruits you want!
          </h2>
          <button
            className="bg-[#FF5252] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg hover:bg-[#e04444] focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-[#FF5252] transition"
            onClick={() => {
              navigator.push("/fruits");
            }}
          >
            Let&apos;s go
          </button>
        </div>
      </div>
    </main>
  );
}
