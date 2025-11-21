"use server";

import axios from "axios";
import { getUserToken } from "-/lib/token.utils";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface ProfileUpdate {
  name?: string;
  email?: string;
}

// Get addresses
export async function getAddresses(): Promise<Address[]> {
  const token = await getUserToken();
  if (!token) throw new Error("No token found");

  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: { token :token as string },
  });
  return res.data.data;
}

// Add address
export async function addAddress(address: Omit<Address, "_id">): Promise<Address> {
  const token = await getUserToken();
  const res = await axios.post("https://ecommerce.routemisr.com/api/v1/addresses", address, {
    headers: { token :token as string },
  });
  return res.data.data;
}

// Delete address
export async function deleteAddress(id: string): Promise<void> {
  const token = await getUserToken();
  await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
    headers: { token :token as string },
  });
}

// Update profile
export async function updateProfile(data: ProfileUpdate): Promise<{ name: string; email: string }> {
  const token = await getUserToken();
  const res = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", data, {
    headers: { token :token as string },
  });
  // Return updated user info for client
  return res.data;
}
