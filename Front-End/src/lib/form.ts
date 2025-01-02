import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  event_name: Yup.string().required("Event name is required"),
  event_thumbnail: Yup.mixed()
    .test(
      "filesize",
      "the image is too large",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileExtension",
      "The extension is not proper",
      (value) =>
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          ))
    )
    .required("Image is required"),

  event_date: Yup.date().required("Event Date is required"),
  start_time: Yup.string().required("Start Time is required"),
  end_time: Yup.string().required("End time is required"),
  venue: Yup.string().required("Venue is required"),
  location: Yup.string().required("Name of city is required"),
  category: Yup.string()
    .oneOf(["Concert", "Sports", "Theater", "Socials", "Other"])
    .required("Category is required"),
  event_type: Yup.string()
    .oneOf(["Paid", "Free"])
    .required("Choose type of your event"),
  description: Yup.string(),
  event_preview: Yup.string().matches(
    /^https:\/\/(www\.)?youtube\.com\/.+/,
    "Event preview must be a valid YouTube URL"
  ),

  coupon_seat: Yup.number().when("event_type", {
    is: "Paid",
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema.test(
        "no-value",
        "There is no coupon promo for free event",
        (value) => value === 0
      ),
  }),
});

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "You have to set rating for this event")
    .required("You have to set the rate first"),
  comment: Yup.string().required("Give your honest review about this event"),
});

// Schema untuk tiket
export const ticketSchema = Yup.object().shape({
  category: Yup.string().required("Ticket name is required"),
  seats: Yup.number()
    .min(1, "At least 1 seat is required")
    .required("Seats are required"),
  price: Yup.number().when("event_type", {
    is: "Paid",
    then: (schema) =>
      schema
        .required("Price is required")
        .min(20000, "Minimum price is Rp20.000"),
    otherwise: (schema) =>
      schema.test(
        "free-ticket-price",
        "The ticket is free; the ticket price must be 0",
        (value) => value === 0 || value === null
      ),
  }),
  desc: Yup.string().optional(),
  event_type: Yup.string().required("Event type is required"), // Harus ada di data yang divalidasi
});

// Schema untuk array tiket
export const ticketEventSchema = Yup.object().shape({
  tickets: Yup.array()
    .of(ticketSchema)
    .min(1, "At least one ticket is required")
    .required("Tickets are required"),
});
