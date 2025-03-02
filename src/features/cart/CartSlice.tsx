// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

// interface ICartItem {
//   id: number;
//   itemId: number;
//   cartId: number;
//   sizeId: number;
//   quantity: number;
//   price: number;
//   pricePerQuantity: number;
// }

// interface ICart {
//   id: number | null;
//   userId: string;
//   totalPrice: number | null;
//   numItems: number | null;
//   items: ICartItem[];
// }

// const initialState: ICart = {
//   id: null,
//   userId: "",
//   totalPrice: null,
//   numItems: null,
//   items: [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     incrementQuantity(state, action) {},
//     decrementQuantity(state, action) {},
//     clearCart(state, action) {},
//     addCart(state, action) {
//       state.userId = action.payload.userId;
//       state.id = action.payload.id;
//     },
//     addToCart(state, action) {
//       state.items.push(action.payload);
//     },
//     changeItemSize(state, action) {},
//   },
// });

// export const {
//   incrementQuantity,
//   decrementQuantity,
//   clearCart,
//   addCart,
//   addToCart,
//   changeItemSize,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// export const getCart = (state: RootState) => state.cart;
