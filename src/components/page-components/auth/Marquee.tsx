import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const items = [
    { id: 1, text: "Where is the party at?", icon: "📍" },
    { id: 2, text: "Where is the party at?", icon: "📍" },
    { id: 3, text: "Where is the party at?", icon: "📍" },
    { id: 4, text: "Where is the party at?", icon: "📍" },
    { id: 5, text: "Where is the party at?", icon: "📍" },
    { id: 6, text: "Where is the party at?", icon: "📍" },
  ];

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
        <motion.div
          className=" my-6 flex items-center"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        >
          <ul className="flex gap-5">
            {items.map((item) => (
              <div key={item.id} className="inline-block bg-[#281E17] pl-4">
                <div className="flex items-center justify-between gap-5">
                  <span>{item.icon}</span>{" "}
                  <span className="text-white font-pally-regular">
                    {item.text}
                  </span>
                  <div className="w-16 h-12">
                    <Image
                      src={"/images/tick-img.png"}
                      width={55}
                      height={39}
                      alt="ticket"
                      className="w-full h-full pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </motion.div>
      </div>
  )
}

export default Marquee