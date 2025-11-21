"use client";

import { productType } from "-/app/_interfaces/products";
import Link from "next/link";

type Props = {
  product: productType;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition product-card">
      {/* استخدمنا Link بدل link */}
      <Link href={`/productDetails/${product.id}`}>
        <div className="relative">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-56 object-cover"
          />
          {product.priceAfterDiscount && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
              {Math.round(
                ((product.price - product.priceAfterDiscount) /
                  product.price) *
                  100
              )}
              % OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {product.category?.name} • {product.brand?.name}
        </p>
        <p className="text-yellow-500 text-sm mb-2">
          ⭐ {product.ratingsAverage.toFixed(1)}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.priceAfterDiscount || product.price}
            </span>
            {product.priceAfterDiscount && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.price}
              </span>
            )}
          </div>
          <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
