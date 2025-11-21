"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { CartContextProvider } from './cartContext'
import { Provider } from 'react-redux'
import { store } from '-/lib/store'

export default function authProvider({children}:{children:ReactNode}) {
  return (
    <SessionProvider>
      <CartContextProvider>
            <Provider store={store}>

                {children}
    </Provider>,
      </CartContextProvider>
    </SessionProvider>
  )
}
