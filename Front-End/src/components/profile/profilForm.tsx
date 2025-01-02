"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
};

type OrganizerProfile = {
  id: string;
  organizer_name: string;
  email: string;
  avatar?: string | null;
};

type ProfileFormProps = {
  user: UserProfile | OrganizerProfile;
  onSubmit: (formData: any) => Promise<void>;
  userType: "user" | "organizer";
};

export default function ProfileForm({ user, onSubmit, userType }: ProfileFormProps) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow sm:rounded-lg p-6">
      {userType === "user" ? (
        <>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={(formData as UserProfile).firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={(formData as UserProfile).lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="organizer_name" className="block text-sm font-medium text-gray-700">
            Organizer Name
          </label>
          <input
            type="text"
            id="organizer_name"
            name="organizer_name"
            value={(formData as OrganizerProfile).organizer_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
          Avatar URL
        </label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={formData.avatar || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Profile
      </button>
    </form>
  );
}

