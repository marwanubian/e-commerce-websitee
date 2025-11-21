"use client"
import { useForm } from "react-hook-form";
import { useCart } from "../context/cartContext";
import { getCashOrder, getOnlineOrder } from "-/actions/payment.action";
import { useRouter } from "next/navigation"; // ✅ correct import
import { Label } from "-/components/ui/label"
import { RadioGroup, RadioGroupItem } from "-/components/ui/radio-group"
import { useState } from "react";

interface Inputs {
  details: string;
  phone: string; 
  city: string;
}

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<"cash"|"online"|null>(null)
  const { cartDetails, setCartDetails } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const cartId = cartDetails?.cartId;

  const router = useRouter(); // ✅ initialize router

  async function onSubmit(values: Inputs) {
    console.log(paymentMethod, "checkout ✅");
    if (paymentMethod =="cash"){
        try {
      const response = await getCashOrder(cartId as string, values);
      console.log(response.data.status);

      if (response.status === "success") {
        setCartDetails(null);
        router.push("/"); // ✅ works now
      }
    } catch (error) {
      console.error("Checkout failed ❌", error);
    }  
    }else if(paymentMethod == "online"){
     try {
      const response = await getOnlineOrder(cartId as string, values);
      // console.log(response.data.status);
      console.log(response.status);

      if (response.status === "success") {
        // setCartDetails(null);
        // router.push("/"); // ✅ works now
              console.log(response.status);
              console.log(response.session.url);

        window.location.href=response.session.url
      }
    } catch (error) {
      console.error("Checkout failed ❌", error);
    }  
    }
  
  }

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-xl font-bold mb-4">Payment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <input
            {...register("details", { required: "Email is required" })}
            type="email"
            placeholder="Your Email"
            className="border px-3 py-2 rounded w-full"
          />
          {errors.details && <p className="text-red-500">{errors.details.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
            placeholder="Your Phone"
            className="border px-3 py-2 rounded w-full"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {/* City */}
        <div>
          <input
            {...register("city", { required: "City is required" })}
            type="text"
            placeholder="Your City"
            className="border px-3 py-2 rounded w-full"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        {/* Submit */}
        <RadioGroup defaultValue="option-one" className="my-5" onValueChange={(value)=>setPaymentMethod(value as "online"|"cash")}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="cash" id="cash" />
    <Label htmlFor="cash">cash payment</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="online" id="online" />
    <Label htmlFor="online">online payment</Label>
  </div>
</RadioGroup>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Checkout
        </button>
      </form>
    </div>
  );
}
