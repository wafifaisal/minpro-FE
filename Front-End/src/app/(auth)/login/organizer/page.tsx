"use client"; // Mark the component as a client component

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";

const OrgLogin = () => {
  // State hooks for showing password and login messages
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  // Initial values for the form
  const initialValues = {
    loginIdentifier: "",
    password: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    loginIdentifier: Yup.string().required("Email or Username is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch(
        "https://hypetix-back.vercel.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned invalid response: ${responseText.substring(
            0,
            100
          )}...`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "An error occurred during login");
      }

      setLoginMessage("Login successful!");
      console.log("Logged in user:", data);
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setLoginMessage(null);
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">
          Organizer Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="loginIdentifier"
                  placeholder="Email or Username"
                  className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="loginIdentifier">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
                <ErrorMessage name="password">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {loginMessage && (
          <p className="text-green-500 text-center mt-4">{loginMessage}</p>
        )}
      </div>
    </div>
  );
};

export default OrgLogin;
