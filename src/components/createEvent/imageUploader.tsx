"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FormikProps } from "formik";
import { HoverEffectCard } from "../ui/fileUpload";

interface FieldThumbnailProps {
  name: string;
  formik: FormikProps<any>;
  className?: string;
}

export const FieldThumbnail: React.FC<FieldThumbnailProps> = ({
  name,
  formik,
  className = "",
}) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue(name, file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className={`flex w-full h-full flex-col gap-4 ${className}`}>
      <input
        type="file"
        id={name}
        name={name}
        className="hidden"
        ref={imgRef}
        onChange={handleChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />

      {!previewUrl ? (
        <div
          onClick={() => imgRef.current?.click()}
          className="relative w-full mx-auto min-h-96 flex items-center justify-center border border-dashed border-neutral-400 rounded-lg bg-neutral-50 dark:bg-neutral-900 cursor-pointer transition duration-200 hover:shadow-lg hover:border-neutral-600 overflow-hidden"
        >
          <HoverEffectCard />
          <motion.p
            className="absolute text-neutral-600 dark:text-neutral-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.p>
        </div>
      ) : (
        <motion.div
          onClick={() => imgRef.current?.click()}
          className="w-full max-w-4xl mx-auto min-h-96 border border-dashed rounded-lg cursor-pointer transition duration-200 hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={previewUrl}
            alt="Preview"
            width={600}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
          />
          <motion.div
            className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Click to change
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
