// export type productType={
//     id: string,
//         title: string,
//      imageCover: string,
// quantity: number,
//        description:string,
//      category: categoryType,
//     brand:brandType,
// price: number,
//       ratingsAverage: number,
//   priceAfterDiscount?: number,
//     createdAt: string,
//     updatedAt:string,
//      image: string,
// }

export interface productType {
  _id?: string;  // optional, in case backend sends this
  id?: string;   // optional, in case backend sends this
  title: string;
  description?: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
    ratingsAverage: number;
    createdAt: string,
    updatedAt:string,
     image: string,
     category: categoryType,
    brand:brandType,
  // add other fields from API response if needed
}

export type categoryType={
    id:string,
      name: string,
      slug:string,
      image:string
    }
    export type brandType={
    id:string,
      name: string,
      slug:string,
      image:string
    }