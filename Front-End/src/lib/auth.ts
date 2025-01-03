import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserProfile() {
  // TODO: Implement actual user authentication
  // For now, we'll just fetch the first user in the database
  const user = await prisma.user.findFirst({
    include: {
      User_Coupon: true,
      User_Point: true,
    },
  });

  return user;
}
