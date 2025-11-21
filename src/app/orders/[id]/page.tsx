"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "-/lib/store";
import { getOrderById } from "-/lib/ordersSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderDetails() {
  const { id } = useParams(); // ✅ orderId from URL
  const dispatch = useDispatch<AppDispatch>();
  const { order, isLoading } = useSelector(
    (state: RootState) => state.ordersRed
  );

  useEffect(() => {
    if (id) dispatch(getOrderById(id as string));
  }, [dispatch, id]);

  if (isLoading) return <p className="text-center">Loading order...</p>;

  if (!order) return <p className="text-center">No order found</p>;

  return (
    <div className="max-w-4xl mx-auto my-10">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4">
        <Link href="/orders" className="text-blue-600 hover:underline">
          Orders
        </Link>{" "}
        / <span className="text-gray-500">{order._id}</span>
      </nav>

      <h2 className="text-2xl font-bold mb-6">Order Details</h2>
      <div className="border rounded-lg shadow p-6 bg-white">
        <p className="font-semibold">Order ID: {order._id}</p>
        <p>Status: {order.status || "Processing"}</p>
        <p>Total Price: {order.totalOrderPrice} EGP</p>

        <h3 className="text-xl font-bold mt-6 mb-4">Products</h3>
        <div className="grid gap-6">
          {order.cartItems?.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border rounded p-4"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.title}</p>
                <p>Quantity: {item.count}</p>
                <p>Price: {item.price} EGP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
