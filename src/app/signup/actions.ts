"use server"
import bcryptjs from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signUpUser(prevState: any, formData: FormData) {
    const username = formData.get('username')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()   

    if (!username || !email || !password) {
        throw Error("Enter required field")
    }

    try {    
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (userExists) { 
            throw Error("User already exists")
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
    
        revalidatePath("/")
        return {message: 'User Added Successfully'}
    } catch (error: any) {
        return {message: error.message}
    }

}