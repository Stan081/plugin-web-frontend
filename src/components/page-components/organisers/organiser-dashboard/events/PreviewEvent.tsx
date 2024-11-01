"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { RiSmartphoneLine } from "react-icons/ri";
import {
  PreviewEventMobile,
  PreviewEventPage,
} from "@/pages/explore-events/[id]";

interface PreviewEventProps {
  open: boolean;
  close: () => void;
}

const tabLink = [
  {
    title: "Desktop view",
    key: "desktop",
    icon: <MdOutlineDesktopWindows size={20} color="#586170" />,
  },
  {
    title: "Mobile view",
    key: "mobile",
    icon: <RiSmartphoneLine size={20} color="#586170" />,
  },
];

const PreviewEvent: FC<PreviewEventProps> = ({ open, close }) => {
  const [view, setView] = useState<string>("desktop");
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-7xl rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium items-center flex justify-between p-3 bg-gray-100 rounded-xl"
            >
              <p className="bg-white px-2 py-1 rounded-xl font-pally-regular text-base border border-gray-200">
                Preview mode
              </p>

              <ul className=" flex justify-start items-center gap-4 align-baseline">
                {tabLink.map((tab) => (
                  <li key={tab.key} role="presentation">
                    <button
                      className={`font-pally-regular py-2 px-3 flex items-center gap-3 ${
                        view === tab.key
                          ? "border-2 border-[#D9302A] text-[#D9302A] rounded-xl"
                          : " text-[#586170]"
                      }`}
                      role="tab"
                      aria-selected={view === tab.key}
                      aria-controls={`panel-${tab.key}`}
                      id={`tab-${tab.key}`}
                      onClick={() => setView(tab.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setView(tab.key);
                        }
                      }}
                    >
                      {tab.title}
                      {tab.key === "desktop" ? (
                        <MdOutlineDesktopWindows
                          size={20}
                          color={view === "desktop" ? "#D9302A" : "#586170"}
                        />
                      ) : (
                        <RiSmartphoneLine
                          size={20}
                          color={view === "mobile" ? "#D9302A" : "#586170"}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="p-6 h-[80vh] overflow-y-auto">
              {view === "desktop" && <PreviewEventPage propId="1" />}
              {view === "mobile" && (
                <div className="mx-auto w-[500px]">
                  <PreviewEventMobile propId="1" />
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PreviewEvent;
