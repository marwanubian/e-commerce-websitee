"use client";

import { addProductToWishlist, removeFromWishlist } from "-/actions/wishList.action";
import { useWishlist } from "-/app/context/wishListContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

export default function WishlistIcon({ id }: { id: string }) {
  const { wishlist, refreshWishlist } = useWishlist();

  // ✅ check if product exists in wishlist
  const isInWishlist = wishlist?.some((item: any) => item.id === id);

  async function toggleWishlist(productId: string) {
    if (isInWishlist) {
      const result = await removeFromWishlist(productId);
      toast.success(result?.message ?? "Removed from wishlist!");
    } else {
      const result = await addProductToWishlist(productId);
      toast.success(result?.message ?? "Added to wishlist!");
    }
    refreshWishlist();
  }

  return (
    <button
      onClick={() => toggleWishlist(id)}
      className={`p-3.5 rounded-full shadow-lg transition-all duration-300 ${
        isInWishlist
          ? "bg-rose-500 text-white hover:bg-rose-600"
          : "bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-500"
      }`}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}
