import { IOrganizer } from "../types/profile";

export async function getOrganizerData(): Promise<IOrganizer | null> {
  return {
    id: "1",
    organizer_name: "Test Organizer",
    email: "test@example.com",
    password: "password123",
    avatar:
      "https://res.cloudinary.com/dkyco4yqp/image/upload/v1735131879/HYPETIX-removebg-preview_qxyuj5.png",
    isVerify: false,
  };
}
