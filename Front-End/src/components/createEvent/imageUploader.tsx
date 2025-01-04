"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FormikProps } from "formik";
import { HoverEffectCard } from "../ui/fileUpload";

// Define the type for the form data
interface FieldThumbnailProps {
  name: string;
  formik: FormikProps<{ event_thumbnail: File | null }>; // Correct type for formik prop
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
      formik.setFieldValue(name, file); // Set the file for event_thumbnail
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      console.log("No file selected");
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
        <div
          onClick={() => imgRef.current?.click()}
          className="w-full max-w-4xl mx-auto min-h-96 border border-dashed rounded-lg cursor-pointer transition duration-200 hover:shadow-xl"
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
          <div className="relative bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
            Click to change
          </div>
        </div>
      )}
    </div>
  );
};
