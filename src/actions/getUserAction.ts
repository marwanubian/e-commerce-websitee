"use server";

import axios from "axios";
import { getUserToken } from "-/lib/token.utils";

// Interface
export interface UserProfile {
  name: string;
  email: string;
  image?: string;
}

// Fetch current user profile
export async function getUserProfile(): Promise<UserProfile> {
  const token = await getUserToken();
  if (!token) throw new Error("No token found");

  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/users/me", {
    headers: { token: token as string },
  });

  // Assuming your API returns { data: { name, email, image } }
  return res.data.data;
}
