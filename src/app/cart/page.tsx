import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import setProductQuantity from "./actions";
import CartEntry from "./CartEntry";
import TotalWithShipping from "./TotalWithShipping";

export const metadata = {
  title: "Your Cart - GarageShop",
};

export default async function CartPage() {
  const cart = await getCart();
  let subtotal

  if (cart?.subtotal == 0) {
    subtotal = false
  } else {
    subtotal = true
  }
  return (
      <div className="flex">
        <div className="w-1/2">
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map((cartItem: any) => (
                <CartEntry
                cartItem={cartItem}
                key={cartItem.id}
                setProductQuantity={setProductQuantity}
                />
            ))}
        </div>
          {subtotal && <div className="w-1/2">
            <div className="flex flex-col fixed gap-4 border border-solid border-slate-900 shadow-md w-80 py-10 mx-10 bg-slate-100 rounded-lg sm:items-center">
                <p className="mb-3 font-bold">
                Subtotal: {formatPrice(cart?.subtotal || 0)}
                </p>
                <TotalWithShipping cart={cart!} /> 
                {!cart?.items.length ? (
                <div></div>
                ) : (
                <button className="btn-primary btn sm:w-[200]">Checkout</button>
                )}
              </div>
          </div>}
          {!cart?.items.length && <p><br /> Your cart is empty</p>}
    </div>
  );
}