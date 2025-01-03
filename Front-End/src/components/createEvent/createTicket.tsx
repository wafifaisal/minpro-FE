"use client";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import TicketDescription from "./ticketTextEditor";
import axios from "@/helpers/axios"; // Import axios instance
import { AxiosError } from "axios"; // Import AxiosError directly from 'axios'
import { toast } from "react-toastify";
import { formatCurrency } from "@/helpers/formatDate";
import { FormValueTicketEvent } from "@/types/form";
import { ticketEventSchema } from "@/lib/form";

export default function CreateTicket({
  eventId,
  event_type,
}: {
  eventId: string;
  event_type: "Free" | "Paid";
}) {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    tickets: [
      {
        category: "",
        seats: 0,
        price: 0,
        desc: "",
        event_type,
      },
    ],
  };

  const handleAddTickets = async (
    values: { tickets: FormValueTicketEvent[] },
    resetForm: () => void,
  ) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to create the tickets? (People can buy your tickets immediately)",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true while making the request
      const { data } = await axios.post(`/tickets/${eventId}`, {
        tickets: values.tickets.map((ticket) => ({
          category: ticket.category,
          seats: ticket.seats,
          desc: ticket.desc,
          price: ticket.price, // Backend will decide the price based on event_type
        })),
      });
      toast.success(data.message || "Tickets created successfully!");
      resetForm();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // Handle AxiosError properly by accessing the response
        toast.error(
          err.response?.data?.message ||
            "An error occurred while creating tickets.",
        );
      } else {
        // Generic error handling if it's not an AxiosError
        toast.error("An unexpected error occurred");
      }
      console.error(err); // Log error for debugging
    } finally {
      setIsLoading(false); // Set loading state to false after the request completes
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Delete",
    ];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-neutral-900 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
        CREATE YOUR EVENT TICKETS
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ticketEventSchema}
        onSubmit={(values, { resetForm }) =>
          handleAddTickets(values, resetForm)
        }
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-6 text-white">
            <FieldArray
              name="tickets"
              render={(arrayHelpers) => (
                <>
                  {values.tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="border p-4 sm:p-6 md:p-8 rounded-md bg-neutral-800 shadow-md"
                    >
                      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                        Ticket {index + 1}
                      </h2>

                      <div className="mb-4">
                        <label
                          htmlFor={`tickets.${index}.category`}
                          className="font-semibold block mb-2 text-gray-300"
                        >
                          Ticket Name:
                        </label>
                        <Field
                          type="text"
                          name={`tickets.${index}.category`}
                          placeholder="Enter ticket name"
                          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 bg-slate-700 text-white"
                        />
                        <ErrorMessage
                          name={`tickets.${index}.category`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor={`tickets.${index}.seats`}
                          className="font-semibold block mb-2 text-gray-300"
                        >
                          Ticket Seats:
                        </label>
                        <Field
                          type="number"
                          name={`tickets.${index}.seats`}
                          placeholder="Enter total seats"
                          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 bg-slate-700 text-white"
                        />
                        <ErrorMessage
                          name={`tickets.${index}.seats`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {event_type === "Paid" && (
                        <div className="mb-4">
                          <label
                            htmlFor={`tickets.${index}.price`}
                            className="font-semibold block mb-2 text-gray-300"
                          >
                            Ticket Price:
                          </label>
                          <Field
                            type="text"
                            name={`tickets.${index}.price`}
                            placeholder="Enter ticket price"
                            value={formatCurrency(ticket.price)} // Displaying formatted price
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              const rawValue = e.target.value.replace(
                                /[^\d]/g,
                                "",
                              );
                              setFieldValue(
                                `tickets.${index}.price`,
                                parseInt(rawValue, 10) || 0,
                              );
                            }}
                            onKeyDown={handleKeyDown}
                            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 bg-slate-700 text-white"
                          />
                          <ErrorMessage
                            name={`tickets.${index}.price`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )}

                      <div className="mb-4">
                        <label
                          htmlFor={`tickets.${index}.desc`}
                          className="pb-2 font-semibold text-gray-300"
                        >
                          Ticket Description:
                        </label>
                        <TicketDescription
                          value={ticket.desc} // Ensure this is a string
                          setFieldValue={(field, value) =>
                            setFieldValue(`tickets.${index}.${field}`, value)
                          }
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove Ticket
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              category: "",
                              seats: 0,
                              price: 0,
                              desc: "",
                            })
                          }
                          className={`py-2 px-4 rounded-md font-semibold text-white ${
                            isSubmitting || isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                          disabled={isSubmitting || isLoading}
                        >
                          Add Ticket
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    className={`mt-6 py-3 px-6 rounded-lg transition-all duration-500 ease-in-out font-semibold border-2 bg-gradient-to-r from-blue-500 to-blue-950 transform hover:scale-105 hover:bg-gradient-to-l hover:from-blue-950 hover:to-blue-500 ${
                      isSubmitting || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "border-lightBlue text-lightBlue hover:bg-lightBlue hover:text-white"
                    }`}
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading
                      ? "Loading ..."
                      : "Create Tickets"}
                  </button>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
