import z from "zod";

export const productSchema = z.object({
  photo: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Photo is required" : "Not a string",
    })
    .nonempty("Photo is required"),
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "title is required" : "Not a string",
    })
    .nonempty("Title is required"),
  description: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Description is required" : "Not a string",
    })
    .nonempty("Description is required"),
  price: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined ? "Price is required" : "Not a number",
    })
    .min(1, "Price is required"),
});

export type ProductType = z.input<typeof productSchema>;
