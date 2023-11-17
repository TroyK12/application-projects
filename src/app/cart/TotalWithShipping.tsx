"use client"
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/format";
import { ShoppingCart } from "@/lib/db/cart";

interface TotalWithShippingProps {
    cart: ShoppingCart
}

export default function TotalWithShipping({cart}: TotalWithShippingProps) {
    const [freeShipping, setFreeShipping] = useState(false)

    useEffect(() => {
        if (cart?.subtotal >= 5000) {
            setFreeShipping(true);
        } else {
            setFreeShipping(false);
        }
    }, [cart])

    return (
        <>
            {freeShipping ? <p>Shipping: <del className="text-gray-300">$10</del> Free</p> : <p>Shipping: $10</p>}
            <p>Total: {freeShipping ? formatPrice(cart?.subtotal) : formatPrice(cart?.subtotal + 1000)}</p>
        </>
    )
}