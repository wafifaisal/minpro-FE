"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
};

const formats = ["list", "bullet"];

interface TicketDescriptionProps {
  setFieldValue: (field: string, value: string) => void;
  value: string; // Menggunakan `value` untuk string langsung
}

const TicketDescription: React.FC<TicketDescriptionProps> = ({
  setFieldValue,
  value,
}) => {
  const handleChange = (e: string) => {
    setFieldValue("desc", e); // Mengupdate nilai desc
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default TicketDescription;
