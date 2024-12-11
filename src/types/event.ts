export interface IOrganizer {
  name: string;
  avatar?: string;
}

export interface IEvent {
  id: string;
  category: string;
  event_name: string;
  event_thumbnail: string;
  event_preview: string;
  slug: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  Organizer: IOrganizer;
  venue: string;
  Ticket: ITicket[];
}

export interface ITicket {
  id: string;
  category: string;
  desc?: string;
  seats?: string;
  price: string;
  order_details?: IOrderDetails;
}

export interface IOrderDetails {
  id: string;
  quantity?: string;
}
