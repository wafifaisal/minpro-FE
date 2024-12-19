import { ErrorMessage, Field, FormikProps } from "formik";
import UseOpen from "@/hooks/useOpen";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FormValueEvent } from "@/types/form";
import { locations } from "./locations";

export default function SetLocation(Props: FormikProps<FormValueEvent>) {
  const { handleChange, values } = Props;
  const { open, hidden, menuHandler } = UseOpen();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);
  return (
    <>
      <button
        type="button"
        onClick={menuHandler}
        className="w-fit hover:text-blue-400 rounded-md font-[550] flex justify-center items-center gap-2"
      >
        <FaLocationDot /> SET LOCATION
      </button>
      <div
        className={`fixed ${
          hidden ? "" : "hidden"
        } z-10 inset-0 bg-[rgba(0,0,0,0.5)]`}
      ></div>
      <div
        className={`${
          open ? "scale-100" : "scale-0"
        } rounded-md w-[50%] py-5 px-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-gray-800 z-20 ${
          hidden ? "" : "hidden"
        }`}
      >
        <button
          type="button"
          onClick={menuHandler}
          className="w-fit text-[1.5rem] hover:text-red-500"
        >
          <IoMdClose />
        </button>
        <div className="flex flex-col">
          <label htmlFor="location" className="pb-2 font-semibold">
            City
          </label>
          <Field
            as="select"
            name="location"
            id="location"
            onChange={handleChange}
            value={values.location}
            className="outline-none border-b pb-2 font-[500] bg-gray-800 text-white"
          >
            <option value={""} disabled className="text-gray-400 font-[500]">
              Select Category
            </option>
            {locations.map((location) => (
              <option
                key={location}
                value={location}
                className={
                  values.location === location
                    ? "text-blue-500"
                    : "text-gray-400"
                }
              >
                {location}
              </option>
            ))}
          </Field>
          <ErrorMessage name="location">
            {(msg) => (
              <div className="text-red-500 text-xs mt-1 ml-1">
                <sup>*</sup>
                {msg}
              </div>
            )}
          </ErrorMessage>
        </div>
        <div className="flex flex-col">
          <label htmlFor="venue" className="pb-2 font-semibold">
            Venue
          </label>
          <Field
            type="text"
            name="venue"
            id="venue"
            onChange={handleChange}
            value={values.venue}
            className="border-2 rounded-md px-2 py-1 bg-slate-500"
          />
          <ErrorMessage name="venue">
            {(msg) => (
              <div className="text-red-500 text-xs mt-1 ml-1">
                <sup>*</sup>
                {msg}
              </div>
            )}
          </ErrorMessage>
        </div>
        <button
          type="button"
          disabled={values.location == "" || values.venue == ""}
          onClick={menuHandler}
          className={`${
            values.location == "" || values.venue == ""
              ? "disabled:cursor-not-allowed"
              : "hover:bg-slate-600 hover:text-gray-800"
          } rounded-md font-[550] mt-4 py-2 bg-gray-800 transition duration-300 w-full`}
        >
          SAVE
        </button>
      </div>
    </>
  );
}
