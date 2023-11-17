import GoogleLogin from "@/components/GoogleLogin"
import FormSubmitBtn from "@/components/FormSubmitBtn"
import { prisma } from "@/lib/db/prisma"
import bcryptjs from "bcryptjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";

export async function signInUser(formData: FormData) {
    "use server"
    const typedEmail = formData.get('email')?.toString()
    if (!typedEmail) {
        return Error('Type an email')
    }
    const typedPassword = formData.get('password')?.toString()

    const findUser = await prisma.user.findUnique({
        where: {
            email: typedEmail
        }
    })
    if (!findUser) return Error("User not found")

    const validPassword = await bcryptjs.compare(typedPassword!, findUser.password!)

    if (!validPassword) return Error("Invalid password")

    
    revalidatePath("/signin")
    redirect("/")
}

export default function signInPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center">Sign In</h1>
            <form              
                action={signInUser}>
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
                <FormSubmitBtn>Sign In</FormSubmitBtn>
            </form>

            <GoogleLogin />
        </div>
    )
}