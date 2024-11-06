import React, { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import Image from "next/image";

interface ViewProfileProps {
  open: boolean;
  close: () => void;
}

const ViewProfile: FC<ViewProfileProps> = ({ open, close }) => {
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
            className="w-full max-w-4xl rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start p-6"
            >
              <p className="font-pally-medium text-2xl flex items-center gap-2">
                Organizer Profile
              </p>
              <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="w-full h-40">
              <Image
                src={
                  "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583"
                }
                alt="event"
                width={160}
                height={134}
                className=" pointer-events-none object-cover w-full h-full"
              />
            </div>

            <div className="p-6 md:px-28 md:py-6 space-y-5">
              <div className="space-y-1.5">
                <p className="font-pally-medium text-lg">
                  Organizer profile Image
                </p>
                <Image
                  src={
                    "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583"
                  }
                  alt="event"
                  width={160}
                  height={134}
                  className=" pointer-events-none object-cover w-52 h-52 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <p className="font-pally-regular text-lg">About organizer</p>
                <div className="border rounded-lg p-4">
                  <p className="font-pally-regular text-sm md:text-base">
                    Afro Nation is a premier music festival celebrating the rich
                    diversity of African music, culture, and heritage. The event
                    brings together top Afrobeat, reggae, dancehall, hip-hop,
                    and R&B artists from around the world. Afro Nation provides
                    an immersive experience with vibrant live performances,
                    cultural showcases, and a festive atmosphere, making it a
                    global destination for music lovers and cultural
                    enthusiasts.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-pally-regular text-lg">About organizer</p>
                <div className="border rounded-lg p-4">
                  <p className="font-pally-regular text-sm md:text-base">
                    Afro Nation is a premier music festival celebrating the rich
                    diversity of African music, culture, and heritage. The event
                    brings together top Afrobeat, reggae, dancehall, hip-hop,
                    and R&B artists from around the world. Afro Nation provides
                    an immersive experience with vibrant live performances,
                    cultural showcases, and a festive atmosphere, making it a
                    global destination for music lovers and cultural
                    enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProfile;
