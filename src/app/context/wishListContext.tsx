"use client";

import { getWishlist, removeFromWishlist } from "-/actions/wishList.action";
import { createContext, useContext, useState, useEffect } from "react";

interface WishlistItem {
  id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  refreshWishlist: () => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // 🛒 استرجاع الـ wishlist من API
  async function refreshWishlist() {
    try {
      const data = await getWishlist();
      setWishlist(data?.data || []);
    } catch (error) {
      console.error("❌ Error fetching wishlist:", error);
    }
  }

  // ❌ حذف منتج من الـ wishlist
  async function removeFromWishlist(id: string) {
    try {
      await removeFromWishlist(id);
      // تحديث القائمة بعد الحذف
      await refreshWishlist();
    } catch (error) {
      console.error("❌ Error removing from wishlist:", error);
    }
  }

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, refreshWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
