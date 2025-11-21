// app/products/page.tsx
import ProductGridSystem from "../_components/productGridSystem/productGridSystem";
import { productType } from "../_interfaces/products";

// Fetch products on the server
async function getAllProducts(): Promise<productType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "no-store", // avoid caching (always fresh)
    });
    const finalResponse = await res.json();
    return finalResponse.data as productType[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
export default async function ProductsPage() {
  const products = await getAllProducts();

  if (!products) {
    return (
      <p className="text-red-500 text-center mt-10">
        ⚠️ Failed to load products.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductGridSystem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
