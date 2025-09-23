"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { SMSLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, dispatch] = useFormState(SMSLogin, initialState);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
            defaultValue=""
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
            defaultValue=""
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
