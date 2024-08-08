
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { LuLayoutGrid } from "react-icons/lu";
import { TbClipboardText } from "react-icons/tb";
import { FiLogOut, FiSettings } from "react-icons/fi";

import { BsQuestionCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@/components/Logo";
import MobileSidebar from "./MobileSidebar";

type Props = {
  open: boolean;
  toggle: () => void;
};

const menuLinks = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LuLayoutGrid size={24} />,
  },
  {
    href: "/dashboard/cases",
    label: "Cases",
    icon: <TbClipboardText size={24} />,
  },
  {
    href: "/help-center",
    label: "Help Center",
    icon: <BsQuestionCircle size={24} />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <FiSettings size={24} />,
  },
];

const Sidebar: FC<Props> = ({ open, toggle }) => {
  const router = useRouter();

  const renderSidebar = (hidden: boolean) => {
    return (
      <div
        className={clsx(
          "lg:fixed lg:inset-y-0 lg:z-20 lg:flex w-full h-full md:w-72 lg:w-60 lg:flex-col border-r bg-white",

          {
            hidden: hidden,
          }
        )}
      >
        <div className="hidden md:flex grow flex-col gap-y-5 overflow-y-auto h-full">
          <nav className="flex shrink-0 h-full flex-1 flex-col gap-4 pb-5">
            <Link href="/" className="mx-3">
              <Logo />
            </Link>
            <ul role="list" className="flex flex-col gap-4 flex-1 h-full">
              {menuLinks.map(({ href, label, icon }, index) => (
                <li
                  key={index}
                  className={`ease-in transition mx-2 ${
                    router.pathname === href
                      ? ` bg-violet-100 delay-75 rounded-md ease-in`
                      : ``
                  }`}
                >
                  <Link
                    href={href}
                    className={`group flex items-center gap-3 p-3 text-md font-medium leading-6 hover:text-black ${
                      router.pathname === href && `text-justiceBlue-600`
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className=" cursor-pointer mx-2 p-2.5 flex gap-3 items-center text-md font-medium rounded-xl hover:bg-violet-100 ease-in transition ">
              <FiLogOut size={24} />
              Logout
            </div>
          </nav>
        </div>
        <MobileSidebar />
      </div>
    );
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={toggle}>          

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-[100px] flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-8 justify-center py-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={toggle}
                    >
                      <span className="sr-only">Close sidebar</span>
                      X
                    </button>
                  </div>
                </Transition.Child>
                {renderSidebar(false)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {renderSidebar(true)}
    </>
  );
};

export default Sidebar;
