"use client";

import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import notFound from "./animation/Not-found.json";

function NotFound() {
  const navigator = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FFFDF7] px-4 text-center">
      <p className="text-[48px] font-bold text-[#333]">404 - Page Not Found</p>
      <p className="text-lg text-[#555] mt-2 max-w-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let get you back to something fruity 🍉.
      </p>

      <div className="w-[300px] h-[300px] mt-6">
        <Lottie animationData={notFound} loop={true} />
      </div>

      <button
        onClick={() => {
          navigator.replace("/");
        }}
        className="mt-6 text-lg font-semibold bg-[#FF5252] px-6 py-2 rounded-[10px] text-white hover:bg-[#FF5240] transition duration-200"
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;
