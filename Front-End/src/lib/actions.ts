"use server";

import { IOrganizer } from "../types/profile";

export async function updateOrganizer(organizer: IOrganizer) {
  console.log("Updating organizer:", organizer);
}

export async function sendVerificationEmail(email: string | null) {
  if (!email) {
    throw new Error("Email is required");
  }
  console.log("Sending verification email to:", email);
}
