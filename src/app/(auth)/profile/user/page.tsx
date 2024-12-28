import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";

export default async function UserProfile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      avatar: true,
      isVerify: true,
      ref_code: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const handleProfileUpdate = async (formData: any) => {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: formData.avatar,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <ProfileForm user={user} onSubmit={handleProfileUpdate} userType="user" />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <p>Verification Status: {user.isVerify ? "Verified" : "Not Verified"}</p>
        <p>Referral Code: {user.ref_code}</p>
      </div>
    </div>
  );
}

