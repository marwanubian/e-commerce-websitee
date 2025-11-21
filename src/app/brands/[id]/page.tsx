"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { productType } from "-/app/_interfaces/products";
import ProductGridSystem from "-/app/_components/productGridSystem/productGridSystem";

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function BrandDetailsPage() {
  const { id } = useParams(); // 👈 dynamic brand id
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrandAndProducts() {
      try {
        // fetch brand details
        const brandRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/brands/${id}`
        );
        setBrand(brandRes.data.data);

        // fetch products for this brand
        const productsRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
        );
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error("Error fetching brand or products ❌", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBrandAndProducts();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!brand) return <p className="text-center text-red-500">Brand not found ❌</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      {/* Brand Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <img
          src={brand.image}
          alt={brand.name}
          className="w-40 h-40 object-contain mx-auto my-4"
        />
        <p className="text-gray-500">Slug: {brand.slug}</p>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-semibold mb-4">Products in {brand.name}</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductGridSystem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
