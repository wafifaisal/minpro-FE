export interface IOrganizer {
  organizer_name: string;
  avatar: string;
}

export interface IEvent {
  id: string;
  category: string;
  event_name: string;
  event_thumbnail: string;
  event_preview?: string;
  start_time: string;
  end_time: string;
  event_date: string;
  location: string;
  description: string;
  Organizer: IOrganizer;
  venue: string;
  event_type: string;
  Ticket: ITicket[];
}

export interface ITicket {
  eventId: string;
  id: number;
  category: string;
  desc?: string;
  seats?: number;
  price: number;
  order_details?: IOrderDetails;
}

export interface IOrderDetails {
  orderId: number;
  quantity?: string;
}
