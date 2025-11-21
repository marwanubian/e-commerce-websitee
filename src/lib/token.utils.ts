import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import React from 'react'

export  async function getUserToken() {
   const decodedToken=(await cookies()).get("next-auth.session-token")?.value||(await cookies()).get("__Secure-next-auth.session-token")?.value;
//  const encodedToken=(await cookies()).get("next-auth.session-token")?.value
   const decreptToken= await decode({token:decodedToken,secret:process.env.AUTH_SECRET!})
   const token= decreptToken?.token
   console.log(token,"tooooken")
  return token
}

