import Image from "next/image"
import { prisma } from "@/lib/db/prisma"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import aboutPhoto from "@/assets/about-photo.avif"

export default async function Home() {

  const newProducts = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 6
  })

  const hoodies = await prisma.product.findMany({
    where: {
       category: {contains: "hoodie", mode: "insensitive" }
      
  },
    orderBy: { id: "desc" },
    take: 3
  })

  const longsleeve = await prisma.product.findMany({
    where: {
       category: {contains: "longsleeve", mode: "insensitive" }
      
  },
    orderBy: { id: "desc" },
    take: 3
  })

  const tshirt = await prisma.product.findMany({
    where: {
       category: {contains: "tshirt", mode: "insensitive" }
      
  },
    orderBy: { id: "desc" },
    take: 3
  })

  return (
    <>
      <div className="w-full h-8 bg-black text-white text-center font-thin">
        Free Shipping on All Orders Over $50
      </div>
      <Image
        src="https://images.pexels.com/photos/713070/pexels-photo-713070.jpeg"
        alt="mainImg"
        width={800}
        height={600}
        className="object-cover w-full max-h-[600px]"
      />

      <h1 className="text-4xl font-bold my-8 w-full text-center">Newest Items Out Now</h1>
      <div className="my-3 px-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {newProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <div className="m-auto md:flex p-5">
        <Image
          src={aboutPhoto}
          alt="About Photo"
          quality={95}
          width={300}
          className="m-auto w-full object-cover self-center md:w-1/2 md:m-14 rounded-lg"
        />
        <p className="m-auto text-base text-gray-700 leading-7 lg:leading-9 tracking-widest md:w-1/2 md:h-auto lg:text-[20px]">
          Welcome to our shop, where comfort meets style! Dive into our collection of high-quality apparel, featuring a curated
          selection of cozy hoodies, trendy t-shirts, and versatile long sleeves. Whether youre seeking casual everyday wear or
          looking to make a fashion statement, our shop has the perfect blend of comfort and fashion to elevate your wardrobe. Explore
          our designs and embrace the warmth and style of our hoodies, the laid-back charm of our t-shirts, and the relaxed elegance
          of our long sleeves – your go-to destination for a wardrobe refresh!
        </p>
      </div>

      <div>
        <h1 className="text-4xl font-bold my-8 w-full text-center">Hoodies</h1>
        <div className="my-3 px-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hoodies.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        </div>
        <Link className="btn ml-10" href={`/productsCategory?data=${encodeURIComponent("hoodie")}`}>See all Hoodies</Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold my-8 w-full text-center">T-Shirts</h1>
        <div className="my-3 px-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tshirt.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        </div>
        <Link className="btn ml-10" href={`/productsCategory?data=${encodeURIComponent("tshirt")}`}>See all T-Shirts</Link>
      </div>

      <div className="pb-10">
        <h1 className="text-4xl font-bold my-8 w-full text-center">Long Sleeves</h1>
        <div className="my-3 px-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {longsleeve.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        </div>
        <Link className="btn ml-10" href={`/productsCategory?data=${encodeURIComponent("longsleeve")}`}>See all Long Sleeves</Link>
      </div>
    </>
  )
}
