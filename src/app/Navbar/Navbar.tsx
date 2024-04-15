
import Link from "next/link";
import UserMenuBtn from "./UserMenuBtn";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
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
        <div className="navbar bg-base-100 max-w-7xl m-auto md:h-28">
            <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="80"
                            width="70"
                            viewBox="0 0 448 512"
                            className="md:hidden mx-5 min-w-[25px]"
                        >
                            <path fill="#000000" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </div>
                    <ul className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-[50vw]">
                        <li className="w-full text-center"><Link href={`/productsCategory?data=${encodeURIComponent("hoodie")}`}>Hoodies</Link></li>
                        <li className="w-full text-center"><Link href={`/productsCategory?data=${encodeURIComponent("longsleeve")}`}>Long Sleeves</Link></li>
                        <li className="w-full text-center"><Link href={`/productsCategory?data=${encodeURIComponent("tshirt")}`}>T-Shirts</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center md:navbar-start md:w-1/3">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                        <path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" />
                    </svg>
                    GarageShop
                </Link>
            </div>
            <ul className="gap-3 w-1/3 justify-center text-md hidden md:flex">
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("hoodie")}`}>Hoodies</Link></li>
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("longsleeve")}`}>Long Sleeves</Link></li>
                <li className="hover:underline"><Link href={`/productsCategory?data=${encodeURIComponent("tshirt")}`}>T-Shirts</Link></li>
            </ul>
            <div className="navbar-end w-1/3 flex">
                <div className="dropdown dropdown-end">
                    <button className="sm:btn sm:btn-ghost sm:btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <form action={searchProducts}>
                        <div tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 form-control">
                            <input
                                name="searchQuery"
                                placeholder="Search"
                                className="input-bordered input w-full min-w-[100px]"
                            />
                            <button type="submit" className="py-2">Search</button>
                        </div>
                    </form>
                </div>
                <ShoppingCartBtn cart={cart} />
                <UserMenuBtn session={session} />
            </div>
            </div>
    )
}

