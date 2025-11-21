"use client"
import React from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "-/components/ui/table"
import { Button } from "-/components/ui/button"
import { useCart } from "-/app/context/cartContext"
import { removeProductfromCart, updateProductfromCart } from "-/actions/cart.action"
import { toast } from "sonner"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus, faTrash, faShoppingBag, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function TableCart() {
  const { cartDetails, refreshCart } = useCart()

  async function handleRemove(productId: string) {
    const response = await removeProductfromCart(productId)
    console.log(response, "response")
    toast.success("Product successfully deleted from Cart 🛒!")
    await refreshCart()
  }

  async function handleUpdate(productId: string, count: number) {
    if (count < 1) return // don't allow negative qty
    const response = await updateProductfromCart(productId, count)
    console.log(response, "response")
    toast.success("Product quantity updated!")
    await refreshCart()
  }

  if (!cartDetails || cartDetails.data.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faShoppingBag} className="text-indigo-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet. Start shopping to add products!
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faShoppingBag} className="text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {cartDetails.data.products.length} {cartDetails.data.products.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Product</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Price</TableHead>
                <TableHead className="font-semibold text-gray-700">Quantity</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Subtotal</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartDetails.data.products.map((product) => (
                <TableRow key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={product.product.imageCover}
                          alt={product.product.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover border border-gray-200"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">
                          {product.product.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.product.category?.name || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-medium text-gray-800 py-4">
                    {product.price} EGP
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleUpdate(product.product._id, product.count - 1)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full border-gray-300"
                      >
                        <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
                      </Button>
                      <div className="w-10 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                        <span className="font-medium">{product.count}</span>
                      </div>
                      <Button
                        onClick={() => handleUpdate(product.product._id, product.count + 1)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full border-gray-300"
                      >
                        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-medium text-gray-800 py-4">
                    {product.price * product.count} EGP
                  </TableCell>
                  
                  <TableCell className="text-right py-4">
                    <Button
                      onClick={() => handleRemove(product.product._id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-full"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow className="bg-gray-50 hover:bg-gray-100">
                <TableCell colSpan={3} className="text-right font-semibold text-lg text-gray-800 py-4">
                  Total Price
                </TableCell>
                <TableCell className="text-right font-semibold text-lg text-indigo-700 py-4">
                  {cartDetails.data.totalCartPrice} EGP
                </TableCell>
                <TableCell className="text-right py-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2">
                    <Link href={"/checkOut"} className="flex items-center gap-2">
                      Checkout
                      <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}