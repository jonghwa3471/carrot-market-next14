"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import z from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Where is my username???"
            : "Username must be a string!",
      })
      // invalid_type_error, required_error is deleted in string()
      /*     .min(3, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Value must be > ${issue.minimum}`;
        }
      },
    }) */
      .toLowerCase()
      .trim()
      // .transform((username) => `🔥${username}🔥`)
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async (data, ctx) => {
    const usernameExists = await db.user.findUnique({
      where: { username: data.username },
      select: { id: true },
    });
    if (usernameExists) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
      });
      return;
    }
    const emailExists = await db.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (emailExists) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
      });
      return;
    }
    if (!checkPasswords(data)) {
      ctx.addIssue({
        code: "custom",
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
      });
      return;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    console.log(flatten);
    /*     const treeify = z.treeifyError(result.error);
    console.log(treeify); */
    return flatten;
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
