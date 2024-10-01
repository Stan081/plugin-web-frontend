import React from "react";

const TestUi = () => {
  return (
    <div className="relative">
      <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden">
        <img src={"/images/list-event-bg.png"} alt="Uploaded" className="w-auto" />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute right-5 top-0 z-10 text-center text-white p-4 flex flex-col items-start space-y-2 md:space-y-4">
        <p>hello</p>
      </div>
    </div>
  );
};

export default TestUi;
