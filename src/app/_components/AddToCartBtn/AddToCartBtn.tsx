"use client"
import { addProductToCart } from '-/actions/cart.action';
import { useCart } from '-/app/context/cartContext';
import React from 'react'
import { toast } from 'sonner';

export default function AddToCartBtn({id}:{id:string}) {
    const {refreshCart}=useCart()

async function handleAddToCart(productId: string) {
  const result = await addProductToCart(productId);
console.log(result, "🛒 products in cart");
    toast.success(result?.message ?? "Product Added to cart successfully!");
   await refreshCart();
}

  return (
 <button onClick={() => handleAddToCart(id)}  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
          Add to Cart
        </button>
    
  )
}


