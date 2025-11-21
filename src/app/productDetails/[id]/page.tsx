import AddToCartBtn from "-/app/_components/AddToCartBtn/AddToCartBtn";
import { productType } from "-/app/_interfaces/products";

type ProductDetailsProps = {
  params: { id: string };
};

async function getProductDetails(id: string): Promise<productType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data as productType;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const product = await getProductDetails(params.id);

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* صورة المنتج */}
      <div>
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
        <p className="text-gray-600 mb-5">{product.description}</p>

        <p className="text-sm text-gray-500 mb-2">
          Category: <span className="font-medium">{product.category?.name}</span>
        </p>
        <p className="text-sm text-gray-500 mb-5">
          Brand: <span className="font-medium">{product.brand?.name}</span>
        </p>

        <p className="text-yellow-500 text-lg mb-4">
          ⭐ {product.ratingsAverage.toFixed(1)}
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold text-gray-900">
            ${product.priceAfterDiscount || product.price}
          </span>
          {product.priceAfterDiscount && (
            <span className="text-lg text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>
<AddToCartBtn id={product._id || product.id!}/>
        {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}
