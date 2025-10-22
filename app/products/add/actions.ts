"use server";

import z from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Photo is required";
      }
    },
  }),
  title: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Title is required";
      }
    },
  }),
  description: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Description is required";
      }
    },
  }),
  price: z.coerce.number({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Price is required";
      }
    },
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return z.flattenError(result.error);
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
      // redirect("/products");
    }
  }
}
