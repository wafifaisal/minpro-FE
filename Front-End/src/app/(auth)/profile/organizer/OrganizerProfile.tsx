"use client";

import { useState } from "react";
import { Organizer } from "@/lib/types";
import { updateOrganizer, sendVerificationEmail } from "@/lib/actions";

export default function OrganizerProfile({
  organizer,
}: {
  organizer: Organizer;
}) {
  const [formData, setFormData] = useState(organizer);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOrganizer(formData);
    setIsEditing(false);
  };

  const handleVerify = async () => {
    await sendVerificationEmail(organizer.email);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Organizer Profile
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="mt-1 flex flex-col items-center">
                <img
                  src={
                    formData.avatar ||
                    "https://res.cloudinary.com/dkyco4yqp/image/upload/v1735131879/HYPETIX-removebg-preview_qxyuj5.png"
                  }
                  alt="Organizer Avatar"
                  className="h-24 w-24 rounded-full object-cover"
                />
                {isEditing && (
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="mt-3"
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="organizer_name"
                className="block text-sm font-medium text-gray-700"
              >
                Organizer Name
              </label>
              <input
                type="text"
                name="organizer_name"
                id="organizer_name"
                value={formData.organizer_name ?? ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email ?? ""}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700">
                Verification Status
              </span>
              {formData.isVerify ? (
                <span className="text-green-600">Email Verified</span>
              ) : (
                <button
                  type="button"
                  onClick={handleVerify}
                  className="mt-1 text-white bg-indigo-600 px-4 py-2 rounded"
                >
                  Verify Email
                </button>
              )}
            </div>
            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
