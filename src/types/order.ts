interface ITicketOrder {
  quantity: number;
  total_price: number;
  final_price: number;
  status: string;
  createdAt: string;
  expiredAt: string;
  Ticket: {
    id: number;
    category: string;
    desc: string;
    price: number;
    Event: {
      event_name: string;
      start_time: string;
      end_time: string;
      event_date: string;
      location: string;
      venue: string;
      event_thumbnail: string;
    };
  };
}

export interface IOrder {
  expiredAt: string;
  total_price: number;
  final_price: number;
  Order_Details: ITicketOrder[];
}
