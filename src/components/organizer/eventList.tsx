import Link from "next/link";
import { type FC } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  ticketsSold: number;
  status: "Active" | "Upcoming";
}

const events: Event[] = [
  {
    id: 1,
    name: "Summer Music Festival",
    date: "2023-07-15",
    location: "Central Park, NY",
    ticketsSold: 5000,
    status: "Active",
  },
  {
    id: 2,
    name: "Tech Conference 2023",
    date: "2023-09-22",
    location: "Convention Center, SF",
    ticketsSold: 2500,
    status: "Active",
  },
  {
    id: 3,
    name: "Food & Wine Expo",
    date: "2023-08-05",
    location: "Expo Center, Chicago",
    ticketsSold: 3000,
    status: "Active",
  },
  {
    id: 4,
    name: "International Film Festival",
    date: "2023-10-10",
    location: "Cinema Complex, LA",
    ticketsSold: 4000,
    status: "Upcoming",
  },
  {
    id: 5,
    name: "Marathon 2023",
    date: "2023-11-12",
    location: "City Center, Boston",
    ticketsSold: 10000,
    status: "Upcoming",
  },
];

export const EventList: FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <Link href="/createevent">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          
          Add New Event
        </button>
          </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Tickets Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {event.name}
                </td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">
                  {event.ticketsSold.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      event.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
