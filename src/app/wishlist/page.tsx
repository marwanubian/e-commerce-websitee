"use client";

import Image from "next/image";
import { Button } from "-/components/ui/button";
import { useWishlist } from "../context/wishListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faHeart} className="text-pink-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your wishlist yet. Start exploring and add items you love!
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faHeart} className="text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          </div>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 text-sm" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold text-indigo-700">${item.price}</p>
                  
                  <div className="flex space-x-2">
                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <FontAwesomeIcon icon={faEye} className="text-gray-600 text-sm" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center hover:bg-indigo-200 transition-colors">
                      <FontAwesomeIcon icon={faShoppingCart} className="text-indigo-600 text-sm" />
                    </button>
                  </div>
                </div>
                
                <Button
                  onClick={() => removeFromWishlist(item.id)}
                  variant="outline"
                  className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-sm" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}