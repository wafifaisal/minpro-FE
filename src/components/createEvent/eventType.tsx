"use client";

import { useState } from "react";
import CreateTicket from "./createTicket";

interface EventTypeProps {
  setFieldValue: (a: string, b: string) => void;
}

export default function EventType({ setFieldValue }: EventTypeProps) {
  const [selectedType, setSelectedType] = useState<string>("free");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    setFieldValue("type", value);
  };

  return (
    <>
      <h3 className="mb-5 ml-2 text-lg font-medium text-slate-400">
        4. Choose your Event Type:
      </h3>
      <ul className="grid w-full gap-6 xl:grid-cols-2">
        <li>
          <input
            type="radio"
            id="free"
            name="type"
            value="free"
            className="hidden peer"
            onChange={handleChange}
            checked={selectedType === "free"}
          />
          <label
            htmlFor="free"
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
            id="paid"
            name="type"
            value="paid"
            className="hidden peer"
            onChange={handleChange}
            checked={selectedType === "paid"}
          />
          <label
            htmlFor="paid"
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

      {/* Conditionally Render the Form */}
      {selectedType === "paid" && (
        <div className="mt-6">
          <CreateTicket />
        </div>
      )}
    </>
  );
}
