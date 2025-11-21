"use client"
import { addProductToCart } from '-/actions/cart.action';
import { useCart } from '-/app/context/cartContext';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { toast } from 'sonner';

export default function CartIcon({id}:{id:string}) {
    const {refreshCart}=useCart()

async function handleAddToCart(productId: string) {
  const result = await addProductToCart(productId);
console.log(result, "🛒 products in cart");
    toast.success(result?.message ?? "Product Added to cart successfully!");
    refreshCart();
}



  return (
            <button
  onClick={() => handleAddToCart(id)} // use product.id here
  className="bg-blue-600 text-white p-3.5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
>
  <FontAwesomeIcon icon={faShoppingCart} />
</button> 

  )
}


