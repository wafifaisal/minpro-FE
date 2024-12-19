"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import TicketDescription from "./ticketTextEditor";

const ticketSchema = Yup.object().shape({
  category: Yup.string().required("Ticket name is required"),
  seats: Yup.number()
    .min(1, "At least 1 seat is required")
    .required("Seats are required"),
  price: Yup.number()
    .min(20000, "Minimum price is Rp20.000")
    .required("Price is required"),
  desc: Yup.string(),
});

const ticketEventSchema = Yup.object().shape({
  tickets: Yup.array().of(ticketSchema),
});

export default function CreateTicket({ _eventId }: { _eventId: string }) {
  const [_isLoading, _setIsLoading] = useState(false);

  const initialValues = {
    tickets: [
      {
        category: "",
        seats: "",
        price: "",
        description: "",
      },
    ],
  };

  return (
    <>
      <h1 className="text-4xl font-bold">CREATE YOUR EVENT TICKETS</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ticketEventSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-4 mt-4">
            <FieldArray
              name="tickets"
              render={(arrayHelpers) => (
                <>
                  {values.tickets.map((ticket, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <h2 className="text-2xl font-semibold mb-4">
                        Ticket {index + 1}
                      </h2>

                      {/* Ticket Name */}
                      <div>
                        <label
                          htmlFor={`tickets.${index}.category`}
                          className="font-semibold block mb-1"
                        >
                          Ticket Name:
                        </label>
                        <Field
                          type="text"
                          name={`tickets.${index}.category`}
                          placeholder="Enter ticket name"
                          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
                        />
                        <ErrorMessage
                          name={`tickets.${index}.category`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Ticket Seats */}
                      <div>
                        <label
                          htmlFor={`tickets.${index}.seats`}
                          className="font-semibold block mb-1"
                        >
                          Ticket Seats:
                        </label>
                        <Field
                          type="number"
                          name={`tickets.${index}.seats`}
                          placeholder="Enter total seats"
                          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
                        />
                        <ErrorMessage
                          name={`tickets.${index}.seats`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Ticket Price */}
                      <div>
                        <label
                          htmlFor={`tickets.${index}.price`}
                          className="font-semibold block mb-1"
                        >
                          Ticket Price (Rp):
                        </label>
                        <Field
                          type="number"
                          name={`tickets.${index}.price`}
                          placeholder="Enter ticket price"
                          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-slate-600"
                        />
                        <ErrorMessage
                          name={`tickets.${index}.price`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Ticket Desc */}
                      <div className="flex flex-col">
                        <label
                          htmlFor={`tickets.${index}.desc`}
                          className="pb-2 font-semibold"
                        >
                          Ticket Description:
                        </label>
                        <TicketDescription
                          setFieldValue={(field, value) =>
                            setFieldValue(`tickets.${index}.${field}`, value)
                          }
                          values={ticket}
                        />
                        <ErrorMessage name={`tickets.${index}.desc`}>
                          {(msg) => (
                            <div className="text-red-500 text-xs mt-1 ml-1">
                              <sup>*</sup>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      {/* Remove Ticket Button */}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove Ticket
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        category: "",
                        seats: "",
                        price: "",
                        desc: "",
                      })
                    }
                    className={`py-2 px-4 rounded-md font-semibold text-white ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Ticket..." : "Add Tickets"}
                  </button>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
