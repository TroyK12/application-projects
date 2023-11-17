import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {    
    return (
        <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body my-5">
        <h2>{product.name}</h2>
        <PriceTag price={product.price} />
      </div>
    </Link>
    )
}   