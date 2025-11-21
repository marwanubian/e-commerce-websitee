"use client";
import { getUserCarts } from "-/actions/cart.action";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartData } from "../_interfaces/cart.model";
 



// 1. Define type of the context
interface CartContextType {
  cartDetails: CartData|null;
  setCartDetails: (cart:CartData|null)=>void;
  refreshCart: () => Promise<void>;
}

// 2. Create the context with default value
const CartContext = createContext<CartContextType>({cartDetails:null,refreshCart:async()=>{},setCartDetails:async()=>{}});

// 3. Provider component
export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartDetails, setCartDetails] = useState<any>(null);

  // function to fetch cart details
  async function refreshCart() {
    try {
      const response = await getUserCarts();
      console.log(response,"cartttttt");
      
      setCartDetails(response);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }

  // fetch cart when provider mounts
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartDetails,refreshCart,setCartDetails }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Custom hook to use context safely
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
