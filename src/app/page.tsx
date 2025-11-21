import { getServerSession } from "next-auth";
import MySwiper from "./_components/mySwiper/mySwiper";
import ProductCard from "./_components/productCard/productCard";
import { productType } from "./_interfaces/products";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CategorySlider from "./_components/categorySlider/CategorySlider";
import Link from "next/link";

// 🛒 Get all products
async function getAllProducts(): Promise<productType[] | null> {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, "session data");
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const finalResponse = await res.json();
    return finalResponse.data as productType[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

// 🖼️ Get hero images from products
async function getHeroImages(): Promise<string[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products?limit=5");
    const data = await res.json();
    return data.data.map((p: any) => p.imageCover);
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return [];
  }
}

// 📂 Get real categories
async function getCategories() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    const data = await res.json();
    return data.data; // [{ _id, name, image }]
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getAllProducts();
  const heroImages = await getHeroImages();
  const categories = await getCategories();

  // Features section (UI ثابتة)
  const features = [
    { title: "Free Shipping", description: "On orders over $50", icon: "🚚" },
    { title: "Secure Payment", description: "100% secure payment", icon: "🔒" },
    { title: "24/7 Support", description: "Dedicated support", icon: "📞" },
    { title: "Easy Returns", description: "30-day return policy", icon: "🔄" },
  ];

  return (
    <main className="min-h-screen">

{/* Hero Banner Section */}
<section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
    {/* Left Content */}
    <div className="md:w-1/2 mb-8 md:mb-0">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SouqOnline</h1>
      <p className="text-xl mb-6 opacity-90">Discover amazing products at unbeatable prices</p>
      <div className="flex space-x-4">
        
        {/* Shop Now Button */}
        <Link href="/products">
          <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Shop Now
          </button>
        </Link>

        {/* View Deals Button */}
        <Link href="/categories">
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-colors">
            View Deals
          </button>
        </Link>
      </div>
    </div>

    {/* Right Side (Swiper) */}
    <div className="md:w-1/2">
      <MySwiper
        images={heroImages}
        slidesPerView={1}
        spaceBetween={0}
        height="h-80 md:h-96"
        autoplay={true}
        showNavigation={true}
      />
    </div>
  </div>
</section>




      {/* Features Section */}
     <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-3xl">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Categories Section */}
          <CategorySlider categories={categories} />


{/* Featured Products Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover our most popular and trending products
      </p>
    </div>

    {!products ? (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">⚠️ Failed to load products.</p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Try Again
        </button>
      </div>
    ) : (
      <>
        {/* Grid of Featured Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md inline-block"
          >
            View All Products
          </Link>
        </div>
      </>
    )}
  </div>
</section>

      
    </main>
  );
}
