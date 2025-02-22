import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getItems, getUserCartByUserId } from "../../services/apiCart";
import useAuth from "../../hooks/useAuth";
import CreateOrder from "../orders/CreateOrder";
import { ToastContainer } from "react-toastify";

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

export interface ICart {
  num_items: number | null;
  total_price: number | null;
  user_id: string;
}

function Cart() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cart, setCart] = useState<ICart | null>(null);
  const { currentUser, userCartId } = useAuth();

  useEffect(
    function () {
      async function fetchCart() {
        if (!currentUser) return;
        const cart = await getUserCartByUserId(currentUser.id);
        setCart(cart);
      }

      fetchCart();
    },
    [currentUser, cartItems],
  );

  useEffect(
    function () {
      async function fetchCartItems() {
        if (userCartId) {
          const items = await getItems(userCartId);

          setCartItems(items);
        }
      }

      fetchCartItems();
    },
    [userCartId],
  );
  return (
    <div className="p-5">
      <ToastContainer />
      <div className="mb-8">
        <h3 className="text-secondary text-3xl font-bold">Your cart</h3>
      </div>
      {cartItems.length ? (
        <div className="grid h-[80vh] grid-cols-3 gap-20">
          <div className="col-span-2">
            {cartItems.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                setCartItems={setCartItems}
              />
            ))}
          </div>

          <CreateOrder
            cart={cart}
            setCartItems={setCartItems}
            setCart={setCart}
          />
        </div>
      ) : (
        <p>No items in your cart</p>
      )}
    </div>
  );
}

export default Cart;
