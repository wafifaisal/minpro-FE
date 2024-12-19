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

  event_preview: Yup.string()
    .url("Event preview must be a valid URL")
    .matches(
      /^https:\/\/(www\.)?youtube\.com\/.+/,
      "Event preview must be a valid YouTube URL"
    )
    .required("Event preview is required"),

  // terms_condition: Yup.string(),
  // coupon_seat: Yup.number().nullable(),
});
