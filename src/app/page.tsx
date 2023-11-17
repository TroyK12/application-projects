import Image from "next/image"
import { prisma } from "@/lib/db/prisma"
import ProductCard from "@/components/ProductCard"

export default async function Home() {

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 6
  })

  return (
    <>
      <div className="w-full h-8 bg-black text-white text-center font-thin">
        Free Shipping on All Orders Over $50
      </div>
      <Image
        src="https://images.pexels.com/photos/713070/pexels-photo-713070.jpeg"
        alt="mainImg"
        width={500}
        height={500}
        className="object-cover w-full max-h-[600px]"
      />

      <h1 className="text-4xl font-bold my-8 w-full text-center">Newest Items Out Now</h1>

      <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  )
}
