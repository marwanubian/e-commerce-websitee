"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: code,
        }
      );

      if (res.status === 200) {
        toast.success("✅ Code verified successfully!");
        // ✅ بعد ما الكود يتأكد، نوجه المستخدم لصفحة reset-password
        setTimeout(() => {
          router.push("/ResetPasswordPage");
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "❌ Invalid reset code");
    }
  }

  return (
    <form
      onSubmit={handleVerify}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Verify Reset Code</h2>
      <input
        type="text"
        placeholder="Enter reset code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Verify Code
      </button>
    </form>
  );
}
