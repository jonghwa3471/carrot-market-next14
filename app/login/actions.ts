"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import z, { flattenError } from "zod";

const formSchema = z.object({
  email: z.email().toLowerCase(),
  password: z
    .string({
      error: (issue) => {
        if (issue.input === "undefined") {
          return "Password is required";
        }
      },
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  /*   const data = {
...Object.fromEntries(formData.entries()),
} */
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const flatten = flattenError(result.error);
    return flatten;
  } else {
    console.log(result.data);
  }
}
