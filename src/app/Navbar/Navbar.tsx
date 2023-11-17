
import Link from "next/link";
import UserMenuBtn from "./UserMenuBtn";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCart } from "@/lib/db/cart";
import { redirect } from "next/navigation";

async function searchProducts(formData: FormData) {
    "use server";
  
    const searchQuery = formData.get("searchQuery")?.toString();
  
    if (searchQuery) {
      redirect("/searchProducts?query=" + searchQuery);
    }
  }

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const cart = await getCart();

    return (
        <div className="navbar h-28 border-b-1 m-auto max-w-7xl">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                        <path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" />
                    </svg>
                    GarageShop
                </Link>
            </div>
            <ul className="flex w-full ml-10 gap-3 text-sm">
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("hoodie")}`}>Hoodies</Link></li>
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("longsleeve")}`}>Long Sleeves</Link></li>
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("tshirt")}`}>T-Shirts</Link></li>
            </ul>
            <div className="flex-none gap-2">
                <form action={searchProducts}>
                    <div className="form-control">
                        <input
                            name="searchQuery"
                            placeholder="Search"
                            className="input-bordered input w-full min-w-[100px]"
                        />
                    </div>
                </form>
            </div> 
            <div className="flex-none">
                <ShoppingCartBtn cart={cart} />
                <UserMenuBtn session={session} />
            </div>
        </div>
    )
}

