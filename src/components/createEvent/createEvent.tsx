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

export default function CreateEvent() {
  const initialValue: FormValueEvent = {
    event_name: "",
    event_thumbnail: null,
    event_preview: null,
    start_time: "",
    end_time: "",
    location: "",
    venue: "",
    category: "",
    event_type: "",
    description: "",
  };
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState<boolean>(false);

  const handleAdd = async (event: FormValueEvent) => {
    try {
      SetIsLoading(true);
      const formData = new FormData();
      for (const key in event) {
        let value = event[key as keyof FormValueEvent];
        if (key.includes("time")) value = `1970-01-01T${value}:00+07:00`;
        if (key.includes("date")) value = `${value}T00:00:00Z`;
        if (value) {
          formData.append(key, value);
        }
      }
      const { data } = await axios.post("/events", formData);

      router.push(`/create-event/${data.event_id}`);
      toast.success(data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl sm:mx-10 tablet:mx-52 shadow-2xl ">
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
            <Form className="flex flex-col gap-4 ">
              <div className="px-5 flex flex-col gap-6 py-4">
                <div className="flex flex-col">
                  <h1 className="my-5 px-2 text-gray-400 font-[500]">
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
                  <h1 className=" my-5 text-gray-400 font-[500]">
                    2. Select your event category :
                  </h1>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={values.category}
                    className="outline-none border-b pb-2 font-[500] bg-gray-800 text-white"
                  >
                    <option
                      value={""}
                      disabled
                      className="text-gray-400 font-[500]"
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
                <h1 className="my-5 px-2 text-gray-400 font-[500]">
                  3. Set Your Event Location :
                </h1>
                <div className="flex gap-2 px-2">
                  <div className="flex-1">
                    <SetLocation {...props} />
                    {(errors.location || errors.venue) &&
                    (touched.location || touched.venue) ? (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {errors.location || errors.venue}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col">
                  <EventType setFieldValue={props.setFieldValue} />
                  <ErrorMessage name="type">
                    {(msg) => (
                      <div className="text-red-500 text-xs mt-1 ml-1">
                        <sup>*</sup>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                {/* <div className="flex-1 flex flex-col gap-2">
                  <SelectDate {...props} />
                  {(errors.start_time || errors.end_time) &&
                  (touched.start_time || touched.end_time) ? (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {errors.start_time || errors.end_time}
                    </div>
                  ) : null}
                  <SelectTime {...props} />
                  {(errors.start_time || errors.end_time) &&
                  (touched.start_time || touched.end_time) ? (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {errors.start_time || errors.end_time}
                    </div>
                  ) : null}
                </div> */}
                <div className="flex flex-col px-2"></div>
                <div className="px-2">
                  <h1 className="my-2 text-gray-400 font-[500]">
                    Set Description :
                  </h1>
                  <RichTextEditor
                    setFieldValue={props.setFieldValue}
                    values={values}
                    name="description"
                  />
                </div>
                <div className="px-2">
                  <h1 className="my-2 text-gray-400 font-[500]">
                    Set Terms & Condition :
                  </h1>
                  <RichTextEditor
                    setFieldValue={props.setFieldValue}
                    values={values}
                    name="description"
                  />
                </div>

                <div className="overflow-hidden ">
                  <FieldThumbnail name="image" formik={props} />
                </div>
                <ErrorMessage name="image">
                  {(msg) => (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`${
                    isLoading
                      ? "disabled:opacity-[0.5] disabled:bg-blue-500 text-white"
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
