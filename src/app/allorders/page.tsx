"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "-/lib/store";
import { getAllOrders } from "-/lib/ordersSlice";
import Link from "next/link";

export default function AllOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading } = useSelector(
    (state: RootState) => state.ordersRed
  );

  useEffect(() => {
    dispatch(getAllOrders("6407cf6f515bdcf347c09f17")); // ✅ userId ثابت مؤقتاً
  }, [dispatch]);

  if (isLoading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>
      <div className="grid gap-6">
        {orders?.map((order: any) => (
          <Link
            key={order._id}
            href={`/orders/${order._id}`}
            className="block border rounded-lg shadow-md hover:shadow-lg transition p-5 bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Status: {order.status || "Processing"}
                </p>
                <p className="text-sm text-gray-600">
                  Total Price: {order.totalOrderPrice} EGP
                </p>
              </div>
              <img
                src={order.cartItems?.[0]?.product?.imageCover}
                alt="Order preview"
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
