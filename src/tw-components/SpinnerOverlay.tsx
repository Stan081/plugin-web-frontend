"use client"
import Image from "next/image";

export const SpinnerOverlay = () => (
  <div
    style={{ zIndex: "100" }}
    className="fixed h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <Image
      src={"/gif/spinner.gif"}
      alt="spinner"
      width={50}
      height={25}
      className="w-auto h-auto"
    />
  </div>
);
