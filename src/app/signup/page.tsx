import GoogleLogin from "@/components/GoogleLogin"
import SignupForm from "./SignupForm"

export default async function signUpPage() {
    
    return (
        <div className="flex flex-col items-center my-6">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <SignupForm />
            <GoogleLogin />
        </div>
    )
}