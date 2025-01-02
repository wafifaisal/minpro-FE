export interface FormValueEvent {
  event_name: string;
  event_thumbnail: File | null;
  event_preview?: string;
  start_time: string;
  end_time: string;
  event_date: string;
  location: string;
  venue: string;
  category: string;
  event_type: string;
  description: string;
  coupon_seat: string;
}

export interface FormValueTicketEvent {
  category: string;
  seats: number;
  price: number;
  desc: string;
}
