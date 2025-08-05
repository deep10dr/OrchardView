"use client";
import loadingData from "./animation/loading1.json";
import Lottie from "lottie-react";
export default function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center  bg-[#FFFDF7]">
      <div className="w-100 h-100 flex">
        <Lottie animationData={loadingData} loop={true} />
      </div>
    </div>
  );
}
