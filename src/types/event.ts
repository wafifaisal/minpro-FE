export interface IEvent {
  id: string;
  category: string;
  event_name: string;
  event_thumbnail: string;
  event_preview: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  organizer: IOrganizer;
  ticket: ITicket;
}

export interface IOrganizer {
  id: string;
  name?: string;
  avatar?: string;
}

export interface ITicket {
  id: string;
  category?: string;
  desc?: string;
  seats?: string;
  price?: string;
  order_details?: IOrderDetails;
}

export interface IOrderDetails {
  id: string;
  quantity?: string;
}
