import { Metadata } from "next";
import AdminDashboard from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Event Ticket Organizer",
  description: "Manage events, tickets, and users",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
