import FormSubmitBtn from "@/components/FormSubmitBtn"
import {prisma} from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
    title: "Add Product"
}

export async function addingProduct(formData: FormData) {
    "use server"

    const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/addProduct");
  }

    const name = formData.get("name")?.toString()
    const category = formData.get("category")?.toString()
    const imageUrl = formData.get("imageUrl")?.toString()
    const price = Number(formData.get("price") || 0)

    if (!name || !category || !imageUrl || !price) {
        throw Error("One of the required fields are missing in the form")
    }

    await prisma.product.create({
        data: {
            name,
            category,
            imageUrl,
            price
        }
    })

    redirect("/")
}

const addProduct = async () => {
    
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/api/auth/signin?callbackUrl=/addProduct");
    }


    return (
        <div>
            <h1 className="text-5xl font-bold text-center">Add Products</h1>
            <form
                className="flex flex-col items-center"
                action={addingProduct}
            >
                <input
                    name="name"
                    placeholder="Name"
                    required
                    className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
                    />
                <select
                    name="category"
                    placeholder="Category"
                    required
                    className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black" 
                >
                    <option value="hoodie">Hoodie</option>
                    <option value="tshirt">T-Shirt</option>
                    <option value="longsleeve">Long Sleeve</option>
                    </select>
                <input
                    name="imageUrl"
                    type="url"
                    placeholder="Insert Image Here"
                    required
                    className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
                    />
                <input
                    name="price"
                    type="number"
                    placeholder="Product Price (Enter price without periods or symbols)"
                    required
                    className="input w-full max-w-[600px] bg-slate-300 rounded-md my-3 text-black"
                />
                <FormSubmitBtn>Add Product</FormSubmitBtn>
            </form>
        </div>
    )
}

export default addProduct;