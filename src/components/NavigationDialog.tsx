"use client";

import { Fragment } from "react";
import { RiCloseLine, RiMenu4Fill } from "react-icons/ri";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";

export const NavigationDialog = () => {

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <div className="block md:hidden rounded-md border-2 border-black p-1 cursor-pointer">
            <RiMenu4Fill size={24} color="#000" />
          </div>
        </DialogTrigger>
        <DialogContent className=" p-4 flex-none h-screen bg-white">
          <div>
            <div className="flex justify-between items-start">
              <Logo />
              <DialogClose
                asChild
                className="p-1 bg-gray-300 rounded-full text-gray-500 hover:text-gray-700 "
              >
                <RiCloseLine size={30} />
              </DialogClose>
            </div>
            <Button variant="outline" className="w-full">
              Get help
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
