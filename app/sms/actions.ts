"use server";

import z from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format",
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function SMSLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      const error = z.flattenError(result.error);
      console.log(error);
      return {
        token: false,
        error,
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      const error = z.flattenError(result.error);
      return {
        token: true,
        error,
      };
    } else {
      redirect("/");
    }
  }
}
