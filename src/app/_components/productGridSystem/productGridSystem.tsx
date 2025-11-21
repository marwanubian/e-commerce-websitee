"use client";

import { productType } from "-/app/_interfaces/products";
import { useCart } from "-/app/context/cartContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faPlus } from "@fortawesome/free-solid-svg-icons";
import {  addProductToCart } from "-/actions/cart.action";
import CartIcon from "../CartIcon/CartIcon";
import WishlistIcon from "../WishListIcon/WishListIcon";

type Props = {
  product: productType;
};

export default function ProductGridSystem({ product }: Props) {
// async function handleAddToCart(productId: string) {
//   const result = await addProductToCart(productId); // pass the correct id
//   console.log(result?.cart?.products, "🛒 products in cart");
// }



  const x = useCart();

  console.log(x, "cart");

  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 product-card border border-gray-100 hover:border-blue-100">
      <div className="relative group">
        {/* Wrap only image/content in Link */}
        <Link href={`/productDetails/${product.id}` }>
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.imageCover}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Discount Badge */}
        {product.priceAfterDiscount && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist + Cart Buttons on Hover (outside Link now ✅) */}
       {/* Action Buttons */}
<div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-all duration-300 ">
      <CartIcon id={product._id || product.id!} />
    <WishlistIcon id={product._id || product.id!}/>
{/* </div> */}
</div>

      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 pr-2">
            {product.title}
          </h3>
          {/* <button className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 flex-shrink-0 mt-0.5">
            <FontAwesomeIcon icon={faPlus} className="text-sm" />
          </button> */}
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <span className="bg-gray-100 px-2 py-1 rounded-md mr-2">
            {product.category?.name}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-md">
            {product.brand?.name}
          </span>
        </p>

        <div className="flex items-center mb-3">
          <div className="flex text-amber-400 mr-2">
            {"★".repeat(Math.round(product.ratingsAverage))}
            {"☆".repeat(5 - Math.round(product.ratingsAverage))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.ratingsAverage.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-gray-900">
              ${product.priceAfterDiscount || product.price}
            </span>
            {product.priceAfterDiscount && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.price}
              </span>
            )}
          </div>

          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
}
