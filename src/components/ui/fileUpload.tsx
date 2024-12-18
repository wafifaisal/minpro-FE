import React from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const HoverEffectCard = () => {
  return (
    <div className="w-full">
      <motion.div
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload Your Event Poster Here
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            PNG , JPEG , JPG , WEBP
          </p>
          <div className="relative w-full mt-24 max-w-xl mx-auto">
            <motion.div
              layoutId="hover-effect"
              variants={mainVariant}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
            >
              <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
            </motion.div>

            <motion.div
              variants={secondaryVariant}
              className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
