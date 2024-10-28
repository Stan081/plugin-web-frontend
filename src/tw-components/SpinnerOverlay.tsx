import Image from "next/image";

export const SpinnerOverlay = () => (
  <div
    style={{ zIndex: "100" }}
    className="fixed h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div className="bg-white w-20 h-20 rounded-lg py-8 px-5 flex justify-center items-center">
      <Image src={"/gif/spinner.gif"} alt="spinner" width={50} height={25} className="w-16 h-16" />
    </div>
  </div>
);
