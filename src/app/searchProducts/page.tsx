import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";


interface searchProductsProps {
    searchParams: {query: string}
}

export default async function searchProducts({ searchParams: { query } }: searchProductsProps) {

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { category: {contains: query, mode: "insensitive" } }
            ]
        },
        orderBy: {id: "desc"}
    })
    if (products.length === 0) {
        return <div className="text-center">No Products Found</div>;
      }

    return (
        <>
            <h1 className="text-4xl font-bold w-full text-center my-4 uppercase">Search: { query }</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product: Product) => (
                <ProductCard product={product} key={product.id} />
            ))}
            </div>
        </>
      );
}