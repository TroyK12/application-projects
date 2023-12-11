"use client"
import FormSubmitBtn from "@/components/FormSubmitBtn";
import { useFormState } from "react-dom";
import { signUpUser } from "./actions";

const initialState = {
    message: null,
}

export default function SignupForm() {
    const [state, formAction] = useFormState(signUpUser, initialState)

    return (
        <form action={formAction} className="flex flex-col w-full items-center mb-6">
        <input
            name="username"
            placeholder="Username"
            required
            className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
            />
        <input
            name="email"
            placeholder="Email"
            required
            className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
        />
        <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
            />
            <div>{state?.message}</div>
        <br />
        <FormSubmitBtn>Sign Up</FormSubmitBtn>
    </form>
    )
}