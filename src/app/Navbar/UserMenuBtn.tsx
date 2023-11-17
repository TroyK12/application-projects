"use client"
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import Image from "next/image";
import { signOut, signIn } from "next-auth/react"
import Link from "next/link"

interface UserMenuBtnProps {
    session: Session | null
}

export default function UserMenuBtn({ session }: UserMenuBtnProps) {
    const user = session?.user


    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Image
                        src={user?.image || profilePicPlaceholder}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-10 rounded-full"
                    />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="font-bold">Profile</li>
                
                {user ?
                    <li><button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button></li> :
                    <li><button onClick={() => signIn()}>Login</button></li>}
                {user ? "" : <li><Link href="/signup">Sign Up</Link></li>}
            </ul>
        </div>
    )
}