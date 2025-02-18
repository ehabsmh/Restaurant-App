import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getItems } from "../../services/apiCart";
import { useAppSelector } from "../../hooks/hooks";
import { getCart } from "./CartSlice";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const cartId = useAppSelector(getCart).id;

  useEffect(
    function () {
      async function fetchCartItems() {
        const items = await getItems(cartId);
        console.log(items);

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

      <div className="h-[60vh] overflow-auto">
        {cartItems.map((cartItem, i) => (
          <CartItem key={i} cartItem={cartItem} setCartItems={setCartItems} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
