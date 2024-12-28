// import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";

export default async function OrganizerProfile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const organizer = await prisma.organizer.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      organizer_name: true,
      email: true,
      avatar: true,
      isVerify: true,
    },
  });

  if (!organizer) {
    throw new Error("Organizer not found");
  }

  const handleProfileUpdate = async (formData: any) => {
    await prisma.organizer.update({
      where: { id: organizer.id },
      data: {
        organizer_name: formData.organizer_name,
        email: formData.email,
        avatar: formData.avatar,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Organizer Profile</h1>
      <ProfileForm user={organizer} onSubmit={handleProfileUpdate} userType="organizer" />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <p>Verification Status: {organizer.isVerify ? "Verified" : "Not Verified"}</p>
      </div>
    </div>
  );
}

