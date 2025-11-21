"use server";

import { productType } from "-/app/_interfaces/products";
import { getUserToken } from "-/lib/token.utils";
import axios from "axios";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// get products 
async function getUserCarts() {
  try {
    const token = await getUserToken();
    if (!token) {
      console.error("No token found for user ❌");
      return null;
    }

    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token as string,  // ✅ only one set of braces
        "Cache-Control": "no-cache",
      },
    });

    console.log(res.data, "cart data ✅");
    return res.data; // full cart object
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

//add
async function addProductToCart(productId: string) {
  try {
    const token = await getUserToken();

    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: token as string,
        },
      }
    );

    console.log("🔎 full response from addProductToCart", response.data);
    return response.data.data; // ✅ رجّع cart مباشرة
  } catch (error: any) {
    console.error("❌ Error adding to cart:", error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
//remove
async function removeProductfromCart(productId: string) {
  try {
    const token = await getUserToken();

    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
     
      {
        headers: {
          token: token as string,
        },
      }
    );

    console.log("🔎 remove from cart", response.data);
    return response.data.data; // ✅ رجّع cart مباشرة
  } catch (error: any) {
    console.error("❌ Error adding to cart:", error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
//update
async function updateProductfromCart(productId: string,count:number) {
  try {
    const token = await getUserToken();

    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},
     
      {
        headers: {
          token: token as string,
        },
      }
    );

    console.log("🔎 remove from cart", response.data);
    return response.data.data; // ✅ رجّع cart مباشرة
  } catch (error: any) {
    console.error("❌ Error adding to cart:", error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}


export { getUserCarts ,addProductToCart,removeProductfromCart,updateProductfromCart};
