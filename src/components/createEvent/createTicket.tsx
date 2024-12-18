"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const ticketEventSchema = Yup.object().shape({
  category: Yup.string().required("Ticket name is required"),
  seats: Yup.number()
    .min(1, "At least 1 seat is required")
    .required("Seats are required"),
  price: Yup.number()
    .min(20000, "Minimum price is Rp20.000")
    .required("Price is required"),
  description: Yup.string(),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("End date is required"),
});

export default function CreateTicket() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    category: "",
    seats: "",
    price: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  const date = new Date();
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <>
      <h1 className="text-4xl font-bold">CREATE YOUR EVENT TICKET</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ticketEventSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 mt-4">
            {/* Ticket Name */}
            <div>
              <label htmlFor="category" className="font-semibold block mb-1">
                Ticket Name:
              </label>
              <Field
                type="text"
                name="category"
                placeholder="Enter ticket name"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Ticket Seats */}
            <div>
              <label htmlFor="seats" className="font-semibold block mb-1">
                Ticket Seats:
              </label>
              <Field
                type="number"
                name="seats"
                placeholder="Enter total seats"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
              />
              <ErrorMessage
                name="seats"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Ticket Price */}
            <div>
              <label htmlFor="price" className="font-semibold block mb-1">
                Ticket Price (Rp):
              </label>
              <Field
                type="number"
                name="price"
                placeholder="Enter ticket price"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="start_date" className="font-semibold block mb-1">
                Start Date:
              </label>
              <Field
                type="date"
                name="start_date"
                min={minDate}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
              />
              <ErrorMessage
                name="start_date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="end_date" className="font-semibold block mb-1">
                End Date:
              </label>
              <Field
                type="date"
                name="end_date"
                min={minDate}
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
              />
              <ErrorMessage
                name="end_date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`py-2 px-4 rounded-md font-semibold text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Ticket"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
