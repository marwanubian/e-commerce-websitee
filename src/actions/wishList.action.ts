"use server";

import { getUserToken } from "-/lib/token.utils";
import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

// ✅ Add product to wishlist
export async function addProductToWishlist(productId: string) {
  try {
    const session = await getSession();
    const token = await getUserToken();

    const { data } = await axios.post(
      API_URL,
      { productId },
      {
        headers: {
          token: token as string,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Error adding to wishlist:", error.response?.data || error);
    return { message: "Failed to add product to wishlist" };
  }
}

// ✅ Get wishlist
export async function getWishlist() {
  try {
    const session = await getSession();
    const token = await getUserToken();

    const { data } = await axios.get(API_URL, {
      headers: {
        token: token as string,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error fetching wishlist:", error.response?.data || error);
    return { data: [] };
  }
}

// ✅ Remove product from wishlist
export async function removeFromWishlist(productId: string) {
  try {
    const session = await getSession();
    const token = await getUserToken();

    const { data } = await axios.delete(`${API_URL}/${productId}`, {
      headers: {
        token: token as string,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error removing from wishlist:", error.response?.data || error);
    return { message: "Failed to remove product from wishlist" };
  }
}
