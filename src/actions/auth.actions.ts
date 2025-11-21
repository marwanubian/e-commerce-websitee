"use server";

import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

// Forgot Password
export async function forgotPassword(email: string) {
  try {
    const res = await axios.post(`${BASE_URL}/forgotPasswords`, { email });
    return res.data; // { message: "...", status: "..."}
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error sending reset email");
  }
}

// Reset Password
export async function resetPassword(
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const res = await axios.put(`${BASE_URL}/resetPassword`, {
      token,
      newPassword,
      confirmPassword,
    });
    return res.data; // { message: "...", status: "..."}
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error resetting password");
  }
}
