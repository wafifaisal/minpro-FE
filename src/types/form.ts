export interface FormValueEvent {
  event_name: string;
  event_thumbnail: File | null;
  event_preview: string;
  start_time: string;
  end_time: string;
  event_date: string;
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
  description: string;
}
