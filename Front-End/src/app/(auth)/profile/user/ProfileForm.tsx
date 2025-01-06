// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface IUser {
//   id: string;
//   avatar: string;
//   firstName: string;
//   lastName: string;
// }

// interface UserTicket {
//   id: number;
//   eventId: number;
//   event: {
//     title: string;
//     thumbnail: string;
//     date: string;
//     venue: string;
//   };
//   status: "Pending" | "Paid" | "Cancelled";
//   details: {
//     tickets: {
//       category: string;
//       price: number;
//     }[][];
//     quantity: number;
//   }[];
//   totalPrice: number;
//   finalPrice: number;
//   createdAt: string;
// }

// interface Review {
//   id: number;
//   userId: string;
// }

// export default function ProfilePage() {
//   const [tickets, setTickets] = useState<UserTicket[]>([]);
//   const [reviewedTickets, setReviewedTickets] = useState<{
//     [key: number]: boolean;
//   }>({});
//   const [loadingTickets, setLoadingTickets] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
//   const user: IUser = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : { id: "", avatar: "", firstName: "", lastName: "" };
//   const isAuth = user.id || null;

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const response = await fetch(`${base_url}/order/history/user`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await response.json();
//         setTickets(data.orders);

//         const reviewStatuses: { [key: number]: boolean } = {};
//         await Promise.all(
//           data.orders.map(async (ticket: UserTicket) => {
//             const reviewResponse = await fetch(
//               `${base_url}/reviews/${ticket.eventId}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//               }
//             );
//             const reviews = await reviewResponse.json();
//             reviewStatuses[ticket.eventId] = reviews.some(
//               (review: Review) => review.userId === user?.id
//             );
//           })
//         );
//         setReviewedTickets(reviewStatuses);
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//       } finally {
//         setLoadingTickets(false);
//       }
//     };

//     if (isAuth && user) {
//       fetchTickets();
//     }
//   }, [isAuth, user, base_url]);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       toast.error("No file selected. Please choose a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     try {
//       setUploading(true);
//       const response = await fetch(`${base_url}/users/avatar-cloud`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         toast.success("Your profile picture has been updated successfully!");
//         window.location.reload();
//       } else {
//         throw new Error(`Failed to upload. Status: ${response.status}`);
//       }
//     } catch (error) {
//       toast.error(
//         "Failed to update your profile picture. Please try again later."
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   const openModal = (image: string) => {
//     setSelectedImage(image);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setIsModalOpen(false);
//   };

//   if (!isAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
//         <p>Please log in to view your profile.</p>
//       </div>
//     );
//   }

//   const filteredTickets = tickets.filter(
//     (ticket) => !reviewedTickets[ticket.eventId]
//   );

//   return (
//     <>
//       <div className="min-h-screen py-10 mt-5 flex flex-col lg:flex-row px-6 relative">
//         <div className="flex flex-col w-full lg:w-1/2 bg-black/50 bg-opacity-90 p-5 rounded-xl shadow-lg mt-10">
//           <h2 className="text-2xl font-bold mb-6 text-gray-100">
//             Your Tickets
//           </h2>
//           <div className="space-y-4">
//             {loadingTickets ? (
//               <div className="text-center text-white">Loading tickets...</div>
//             ) : filteredTickets.length > 0 ? (
//               filteredTickets.map((ticket) => (
//                 <div
//                   key={ticket.id}
//                   className="p-4 bg-gray-700 rounded-lg shadow"
//                 >
//                   {/* Ticket Content */}
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-400">
//                 No tickets available for review.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col w-full lg:w-1/2 bg-black/50 bg-opacity-90 p-8 lg:ml-8 rounded-xl shadow-lg mt-10">
//           <div className="flex flex-col items-center w-full mb-8">
//             <
//               src={user.avatar || "https://via.placeholder.com/150"}
//               alt="User Avatar"
//               className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md mb-4 cursor-pointer"
//               onClick={() =>
//                 openModal(user.avatar || "https://via.placeholder.com/150")
//               }
//             />
//             <label className="text-white text-[10px] bg-slate-500 p-1 rounded-3xl hover:bg-yellow-500 hover:text-orange-600 cursor-pointer">
//               {uploading ? "Uploading..." : "Change profile picture"}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 disabled={uploading}
//               />
//             </label>
//             <h2 className="text-2xl font-bold text-white mt-4">
//               {`${user.firstName} ${user.lastName}`}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="relative">
//             <img
//               src={selectedImage!}
//               alt="Full View"
//               className="max-w-full max-h-screen rounded-lg"
//             />
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-white text-3xl"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
