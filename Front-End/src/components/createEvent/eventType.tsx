"use client";

import { useState } from "react";

interface EventTypeProps {
  setFieldValue: (a: string, b: string) => void;
}

export default function EventType({ setFieldValue }: EventTypeProps) {
  const [selectedType, setSelectedType] = useState<string>("free");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    setFieldValue("event_type", value);
  };

  return (
    <>
      <h3 className="mb-5 ml-2 text-lg font-medium text-slate-400">
        5. Choose your Event Type:
      </h3>
      <ul className="grid w-full gap-6 xl:grid-cols-2">
        <li>
          <input
            type="radio"
            id="Free"
            name="type"
            value="Free"
            className="hidden peer"
            onChange={handleChange}
            checked={selectedType === "Free"}
          />
          <label
            htmlFor="Free"
            className="inline-flex items-center justify-between w-full p-5 cursor-pointer border hover:border-blue-500 hover:text-blue-500 rounded-xl peer-checked:text-blue-500 peer-checked:border-blue-500"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">FREE</div>
              <div className="w-full">
                Customer is not charged, the whole event is free.
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="Paid"
            name="type"
            value="Paid"
            className="hidden peer"
            onChange={handleChange}
            checked={selectedType === "Paid"}
          />
          <label
            htmlFor="Paid"
            className="inline-flex items-center justify-between w-full p-5 cursor-pointer border hover:border-blue-500 hover:text-blue-500 rounded-xl peer-checked:text-blue-500 peer-checked:border-blue-500"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">PAID</div>
              <div className="w-full">
                Customers are charged depending on tickets.
              </div>
            </div>
          </label>
        </li>
      </ul>
    </>
  );
}
