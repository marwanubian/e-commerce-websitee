"use server";

import { getUserToken } from "-/lib/token.utils";
import axios from "axios";

interface shippingAddressType{
    details: string,
        phone: string,
        city: string
}
//cash
async function getCashOrder(
  cartId: string,
  shippingAddress: shippingAddressType
) {
  try {
    const token = await getUserToken();

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress }, // ✅ body
      {
        headers: {
          token: token as string,
        },
      }
    );

    console.log("cash payment ✅", response.data);
    return response.data; // return the actual response body
  } catch (error: any) {
    console.error("❌ Error in cash order:", error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
//cash
async function getOnlineOrder(
  cartId: string,
  shippingAddress: shippingAddressType
) {
  try {
    const token = await getUserToken();

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      { shippingAddress }, // ✅ body
      {
        headers: {
          token: token as string,
        },
      }
    );

    console.log("cash payment ✅", response.data);
    return response.data; // return the actual response body
  } catch (error: any) {
    console.error("❌ Error in cash order:", error.response?.data || error.message);

    return {
      status: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export{
    getCashOrder,getOnlineOrder
}