"use client";

import Link from "next/link";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AdminAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Admin Authentication</h2>
        <p className="text-gray-600 mb-6">
          Login or register as an admin for the Event Ticket Organizer
        </p>
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "login"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "register"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {activeTab === "login" && (
              <Link 
                href="/login/organizer"
                className={`w-full block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? <LoadingSpinner /> : "Login"}
              </Link>
            )}
            {activeTab === "register" && (
              <Link 
                href="/register/organizer"
                className={`w-full block py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? <LoadingSpinner /> : "Register"}
              </Link>
            )}
          </div>
        </form>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          By clicking login/register, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
