"use server";

import axios from "axios";
import { getUserToken } from "-/lib/token.utils";

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// Fetch all addresses
async function getUserAddresses(): Promise<Address[] | null> {
  try {
    const token = await getUserToken();
    if (!token) return null;

    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: { token: token as string },
    });

    return res.data.data;
  } catch (err) {
    console.error("❌ Error fetching addresses:", err);
    return null;
  }
}

// Add a new address
async function addUserAddress(address: Omit<Address, "_id">): Promise<Address | { success: false; message: string }> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("No token found");

    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/addresses", address, {
      headers: { token: token as string },
    });

    return res.data.data;
  } catch (err: any) {
    console.error("❌ Error adding address:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
}

// Delete an address
async function deleteUserAddress(addressId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("No token found");

    await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      headers: { token: token as string },
    });

    return { success: true };
  } catch (err: any) {
    console.error("❌ Error deleting address:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
}

// Update an address
async function updateUserAddress(addressId: string, updates: Partial<Omit<Address, "_id">>): Promise<Address | { success: false; message: string }> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("No token found");

    const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, updates, {
      headers: { token: token as string },
    });

    return res.data.data;
  } catch (err: any) {
    console.error("❌ Error updating address:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
}

export { getUserAddresses, addUserAddress, deleteUserAddress, updateUserAddress };
