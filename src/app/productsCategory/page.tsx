import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";


interface ProductsCategoryProps {
    searchParams: {data: string}
}

export default async function ProductsCategory({searchParams: {data} }: ProductsCategoryProps) {
    const category = data.toString()
    
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: category, mode: "insensitive" } },
                { category: {contains: category, mode: "insensitive" } }
            ]
        },
        orderBy: {id: "desc"}
    })

    let title;

    if (category === "hoodie") {
        title = "Hoodies for Any Occation!"
    } else if (category === "longsleeve") {
        title = "Long Sleeve Tee's for Everyone!"
    } else if (category === "tshirt") {
        title = "T'Shirts for Any Style!"
    }

    return (
        <>
            <h1 className="text-4xl font-bold w-full text-center my-4">{title}</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product: any) => (
                <ProductCard product={product} key={product.id} />
            ))}
            </div>
        </>
      );

}