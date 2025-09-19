"use server";

import z from "zod";

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
      .min(3, "Way too short!!!")
      /*     .min(3, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Value must be > ${issue.minimum}`;
        }
      },
    }) */
      .max(10, "That is too long!!!")
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    error: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    console.log(flatten);
    /*     const treeify = z.treeifyError(result.error);
    console.log(treeify); */
    return flatten;
  }
}
