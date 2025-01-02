"use client";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SelectDate from "./selectDate";
import SelectTime from "./selectTime";
import { categories } from "./categories";
import SetLocation from "./SetLocation";
import RichTextEditor from "./textEditor";
import { FieldThumbnail } from "./imageUploader";
import { FormValueEvent } from "@/types/form";
import { eventSchema } from "@/lib/form";
import axios from "@/helpers/axios";
import EventType from "./eventType";
  const [checklistVisible, setChecklistVisible] = useState<boolean>(false); // State untuk checklist
  const setFieldValue = (arg0: string, file: any) => {};


export default function CreateEvent() {
  const initialValue: FormValueEvent = {
    event_name: "",
    event_thumbnail: null,
    event_preview: "",
    start_time: "",
    end_time: "",
    location: "",
    venue: "",
    category: "",
    event_type: "",
    description: "",
    event_date: "",
    coupon_seat: "",
  };
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState<boolean>(false);


  const handleAdd = async (event: FormValueEvent) => {
    try {
      SetIsLoading(true);
      const formData = new FormData();
      for (const key in event) {
        let value = event[key as keyof FormValueEvent];
        if (key.includes("_time")) value = `1970-01-01T${value}:00+07:00`;
        if (key.includes("event_date")) value = `${value}T00:00:00Z`;
        if (value) {
          formData.append(key, value);
        }
      }
      const { data } = await axios.post("/events", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      router.push(`/dashboard/create-event/${data.eventId}`);
      toast.success(data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 text-white rounded-2xl sm:mx-5 md:mx-10 lg:mx-20 xl:mx-40 shadow-2xl py-8">
      <Formik
        initialValues={initialValue}
        validationSchema={eventSchema}
        onSubmit={(values, action) => {
          console.log(values);
          action.resetForm();
          handleAdd(values);
        }}
      >
        {(props: FormikProps<FormValueEvent>) => {
          const { handleChange, values, errors, touched } = props;

          return (
            <Form className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h1 className="my-4 text-gray-400 font-semibold text-lg">
                    1. Set Your Event Name :
                  </h1>
                  <Field
                    type="text"
                    name="event_name"
                    id="event_name"
                    onChange={handleChange}
                    value={values.event_name}
                    placeholder="Event Name"
                    className="outline-none text-2xl px-1 focus:placeholder:text-transparent bg-gray-800 text-white"
                  />
                  <ErrorMessage name="event_name">
                    {(msg) => (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-gray-400 font-semibold text-lg">
                    2. Select your event category :
                  </h1>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={values.category}
                    className="outline-none border-b pb-2 font-semibold bg-gray-800 text-white"
                  >
                    <option
                      value={""}
                      disabled
                      className="text-gray-400 font-semibold"
                    >
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className={
                          values.category === category
                            ? "text-blue-500"
                            : "text-gray-400"
                        }
                      >
                        {category}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category">
                    {(msg) => (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <h1 className="text-gray-400 font-semibold text-lg">
                  3. Set Your Event Location :
                </h1>
                <SetLocation {...props} />
                {(errors.location || errors.venue) &&
                  (touched.location || touched.venue) && (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {errors.location || errors.venue}
                    </div>
                  )}

                <h1 className="text-gray-400 font-semibold text-lg">
                  4. Set Your Event Time :
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                  <SelectDate {...props} />
                  <SelectTime {...props} />
                  {errors.event_date && touched.event_date && (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {errors.event_date}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <EventType setFieldValue={props.setFieldValue} />
                  <ErrorMessage name="event_type">
                    {(msg) => (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-gray-400 font-semibold text-lg">
                    5. Set Description (Optional) :
                  </h1>
                  <RichTextEditor
                    setFieldValue={props.setFieldValue}
                    values={values}
                    name="description"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-gray-400 font-semibold text-lg">
                    6. Set Your Events Preview Using Youtube Link (Optional) :
                  </h1>
                  <Field
                    name="event_preview"
                    id="event_preview"
                    placeholder="Youtube Link"
                    className="outline-none text-2xl px-1 focus:placeholder:text-transparent bg-gray-800 text-white"
                  />
                  <ErrorMessage name="event_preview">
                    {(msg) => (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="overflow-hidden">
                  <FieldThumbnail name="event_thumbnail" formik={props} />
                </div>
                <ErrorMessage name="event_thumbnail">
                  {(msg) => (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>

                <div className="flex flex-col">
                  <label
                    htmlFor="coupon_seat"
                    className="text-gray-400 font-semibold text-lg"
                  >
                    7. Set the number of promotions
                  </label>
                  <Field
                    type="number"
                    name="coupon_seat"
                    id="coupon_seat"
                    onChange={handleChange}
                    value={values.coupon_seat}
                    className="py-1 px-4 outline-none border rounded-md w-full sm:w-auto text-white bg-neutral-800"
                    min={0}
                  />
                  {errors.coupon_seat ? (
                    <ErrorMessage name="coupon_seat">
                      {(msg) => (
                        <div className="text-red-500 text-xs mt-1 ml-1">
                          <sup>*</sup>
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  ) : (
                    <div className="text-xs ml-2 text-gray-400">
                      * Determine how many people can get a discount using their
                      coupons for{" "}
                      <span className="font-semibold">paid events</span>. If not
                      specified, everyone will be eligible to use their coupons
                      to receive the promotion.
                    </div>
                  )}
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`${
                    isLoading
                      ? "disabled:opacity-50 disabled:bg-blue-500"
                      : "hover:bg-blue-500 hover:text-white"
                  } py-2 mx-2 rounded-lg transition ease-linear font-semibold border-2 border-blue-500 bg-gray-800 text-white`}
                >
                  {isLoading ? "Loading ..." : "Create Your Event!"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
