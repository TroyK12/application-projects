"use client"

import { useState, useTransition } from "react";

interface AddToCartBtnProps {
    productId: string;
    incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartBtn({productId, incrementProductQuantity}: AddToCartBtnProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    return (
        <div className="flex items-center gap-2">
          <button
            className="btn-primary btn"
            onClick={() => {
              setSuccess(false);
              startTransition(async () => {
                await incrementProductQuantity(productId);
                setSuccess(true);
              });
            }}
          >
            Add to Cart
          </button>
          {isPending && <span className="loading loading-spinner loading-md" />}
          {!isPending && success && (
            <span className="text-success">Add to Cart</span>
          )}
        </div>
      );
    
}