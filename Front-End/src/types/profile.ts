import { IOrder } from "./order";
import { IReview } from "./review";

export interface IOrganizer {
  id: string;
  organizer_name: string;
  email: string | null;
  password: string | null;
  avatar: string | null;
  isVerify: boolean;
}

export interface IUser {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerify: boolean;
  ref_code: string;
  ref_by: string;
  Order: IOrder;
  // Rating   :  IRating
  // User_Coupn: UserCoupon
  // User_Poin:  UserPoint[]
  Review: IReview;
  createdAt: string;
  // updatedAt:  DateTime
}
