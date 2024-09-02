import React, { useState } from "react";
import { FiWatch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

const OneTimeForm = () => {
  const [alert, setAlert] = useState<boolean>(true);
  return (
    <div>
      {alert && (
        <div className="mt-4 flex justify-between items-center bg-[#FFF1F0] rounded-lg p-1.5">
          <div className="flex items-center gap-3">
            <FiWatch color="#D9302A" size={18} />
            <p className="text-[#101928] font-pally-regular text-sm">
              Start-time and End-time will be recorded and displayed in minutes{" "}
            </p>
          </div>
          <div className="cursor-pointer" onClick={() => setAlert(false)}>
            <MdOutlineClose size={20} color="#000" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OneTimeForm;
