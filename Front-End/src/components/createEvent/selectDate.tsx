import { ErrorMessage, Field, FormikProps } from "formik";
import { SlCalender } from "react-icons/sl";
import UseOpen from "@/hooks/useOpen";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { FormValueEvent } from "@/types/form";

export default function SelectDate(Props: FormikProps<FormValueEvent>) {
  const { handleChange, values } = Props;
  const { open, hidden, menuHandler } = UseOpen();
  const date = new Date();
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

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
        <SlCalender /> SET DATE
      </button>
      <div
        className={`fixed ${
          open ? "" : "hidden"
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
          <label htmlFor="event_date" className="pb-2 font-semibold">
            Event Date :
          </label>
          <Field
            type="date"
            name="event_date"
            id="event_date"
            min={minDate}
            onChange={handleChange}
            value={values.event_date}
            className="border-2 rounded-md px-2 py-1 bg-slate-500"
          />
          <ErrorMessage name="event_date">
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
          disabled={values.event_date == ""}
          onClick={menuHandler}
          className={`${
            values.event_date == ""
              ? "disabled:cursor-not-allowed"
              : "hover:bg-slate-600 hover:text-gray-800"
          } rounded-md font-[550] mt-4 py-2 bg-gray-800 transition duration-300 w-full`}
        >
          Save
        </button>
      </div>
    </>
  );
}
