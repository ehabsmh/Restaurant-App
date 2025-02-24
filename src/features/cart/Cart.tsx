import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getItems, getUserCartByUserId } from "../../services/apiCart";
import useAuth from "../../hooks/useAuth";
import CreateOrder from "../orders/CreateOrder";
import { ToastContainer } from "react-toastify";
import Loader from "../../ui/Loader";

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
  const [isLoading, setIsLoading] = useState(false);
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
          setIsLoading(true);
          const items = await getItems(userCartId);

          setCartItems(items);
          setIsLoading(false);
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
      {isLoading && <Loader color="#ed4b74" />}
      {!isLoading && cartItems.length ? (
        <div className="grid h-[80vh] grid-cols-3 gap-20">
          <div className="col-span-2 overflow-auto">
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
        !isLoading && <p>No items in your cart</p>
      )}
    </div>
  );
}

export default Cart;
