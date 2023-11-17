
import GoogleLogin from "@/components/GoogleLogin"
import FormSubmitBtn from "@/components/FormSubmitBtn"
import bcryptjs from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"

export async function signUpUser(formData: FormData) {
    "use server"

    const username = formData.get('username')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!username || !email || !password) {
        throw Error("Please enter all required fields")
        return
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    redirect("/signin")

}

export default function signUpPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center">Sign In</h1>
            <form action={signUpUser} className="flex flex-col w-full items-center mb-6">
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
                <br />
                <FormSubmitBtn>Sign Up</FormSubmitBtn>
            </form>

            <GoogleLogin />
        </div>
    )
}