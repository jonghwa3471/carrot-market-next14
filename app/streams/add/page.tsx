"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { startStream } from "./actions";

export default function AddStream() {
  const [state, action] = useFormState(startStream, null);
  return (
    <form className="flex flex-col gap-2 p-5" action={action}>
      <Input
        name="title"
        required
        placeholder="Title of your stream."
        errors={state?.formErrors}
      />
      <Button text="Start streaming" />
    </form>
  );
}
