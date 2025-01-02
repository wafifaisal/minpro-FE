interface IUser {
  avatar: string;
  firstName: string;
  lastName: string;
}

export interface IReview {
  rating: number;
  comment: string;
  createdAt: string;
  user: IUser;
}

export interface FormReview {
  rating: number;
  comment: string;
}
