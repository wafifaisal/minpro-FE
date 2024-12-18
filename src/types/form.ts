export interface FormValueEvent {
  event_name: string;
  event_thumbnail: File | null;
  event_preview: File | null;
  start_time: string;
  end_time: string;
  location: string;
  venue: string;
  category: string;
  event_type: string;
  description: string;
}

export interface FormValueTicketEvent {
  category: string;
  seats: string;
  price: string;
  desc: string;
  start_date: string;
  end_date: string;
}
