import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getItems, getUserCartByUserId } from "../../services/apiCart";
import { useAppSelector } from "../../hooks/hooks";
import { getCart } from "./CartSlice";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../contexts/AuthContext";

export interface ICartItem {
  cart_id: number;
  created_at: string;
  id: number;
  item_id: number;
  price: number | null;
  price_per_quantity: number | null;
  quantity: number;
  size_id: number;
  item: {
    id: number;
    image: string;
    name: string;
  };
  size: {
    id: number;
    size: string;
  };
}

interface ICart {
  num_items: number | null;
  total_price: number | null;
  user_id: string;
}

function Cart() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cart, setCart] = useState<ICart>({
    num_items: 0,
    total_price: 0,
    user_id: "0",
  });
  const { currentUser } = useAuth(AuthContext);
  const cartId = useAppSelector(getCart).id!;

  useEffect(
    function () {
      async function fetchCart() {
        const cart = await getUserCartByUserId(currentUser?.id);
        setCart(cart);
      }

      fetchCart();
    },
    [currentUser?.id, cartItems],
  );

  useEffect(
    function () {
      async function fetchCartItems() {
        const items = await getItems(cartId);

        setCartItems(items);
      }

      fetchCartItems();
    },
    [cartId],
  );
  return (
    <div className="p-5">
      <div className="mb-8">
        <h3 className="text-secondary text-3xl font-bold">Your cart</h3>
      </div>
      {cartItems.length ? (
        <div className="flex h-[80vh] items-start gap-20">
          <div>
            {cartItems.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                setCartItems={setCartItems}
              />
            ))}
          </div>
          <div className="h-full w-px bg-gray-300"></div>
          <div>
            <h2 className="text-secondary text-3xl font-bold">New Order</h2>
            <div className="mt-10 flex items-center justify-between">
              <h4 className="text-secondary text-2xl font-medium">Total</h4>
              <p className="text-gradient-1 text-lg font-bold">
                ${cart.total_price}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No items in your cart</p>
      )}
    </div>
  );
}

export default Cart;
