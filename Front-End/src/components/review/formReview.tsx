"use client";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import type { FormReview } from "@/types/review";
import axios from "@/helpers/axios"; // Import your custom axios instance
import { AxiosError } from "axios"; // Import AxiosError directly from 'axios'
import { toast } from "react-toastify";
import { reviewSchema } from "@/lib/form";
import StarRating from "./starRating";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormReview({ id }: { id: string }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const initialValue: FormReview = {
    rating: 0,
    comment: "",
  };

  const handleAdd = async (review: FormReview) => {
    try {
      SetIsLoading(true);
      const { data } = await axios.post(`/reviews/${id}`, review, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success(data.message);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(err);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg ">
      <Formik
        initialValues={initialValue}
        validationSchema={reviewSchema}
        onSubmit={(values, action) => {
          console.log(values);
          action.resetForm();
          handleAdd(values);
        }}
      >
        {({ setFieldValue, values }: FormikProps<FormReview>) => {
          const commentChange = (e: string) => {
            setFieldValue("comment", e);
          };
          return (
            <Form className="flex flex-col gap-4">
              <div className="flex gap-2">
                <StarRating
                  setFieldValue={setFieldValue}
                  values={values.rating}
                />
              </div>
              <ErrorMessage name="rating">
                {(msg) => (
                  <div className="text-red-400 text-xs mt-1 ml-1">
                    <sup>*</sup>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <ReactQuill
                onChange={commentChange}
                value={values.comment}
                className="bg-gray-800 text-gray-200 rounded-md"
              />
              <ErrorMessage name="comment">
                {(msg) => (
                  <div className="text-red-400 text-xs mt-1 ml-1">
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
                    ? "disabled:opacity-50 disabled:bg-gray-700 text-gray-500"
                    : "hover:bg-blue-700 hover:text-white"
                } bg-gray-800 text-gray-200 py-2 mx-2 rounded-lg transition ease-linear font-semibold border-2 border-blue-600`}
              >
                {isLoading ? "Loading ..." : "Submit Review"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
