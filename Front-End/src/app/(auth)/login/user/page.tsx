"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    console.log("Submit button clicked");
    try {
      const response = await fetch(
        "https://hypetix-back.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      console.log("Server response:", response);

      const result = await response.json();
      console.log("Parsed result:", result);

      if (!response.ok) {
        throw new Error(result.message || "An error occurred during login");
      }

      localStorage.setItem("authToken", result.token);
      console.log("Token saved to localStorage:", result.token);

      setLoginMessage("Login successful!");
      console.log("Logged in user:", result);

      router.push("/");
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setLoginMessage(null);
      alert(errorMessage);
    } finally {
      setSubmitting(false);
      console.log("Submitting state reset");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">
          User Login
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email">
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

export default Login;
