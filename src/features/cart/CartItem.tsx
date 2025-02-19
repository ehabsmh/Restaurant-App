import { BiTrash } from "react-icons/bi";
import ItemQuantity from "../../components/ItemQuantity";
import useItemSizes from "../../hooks/useItemSizes";
import { useEffect } from "react";
import {
  changeItemSize,
  decItemQuantity,
  deleteCartItem,
  incItemQuantity,
} from "../../services/apiCart";

function CartItem({ cartItem, setCartItems }) {
  const [itemSizes, fetchItemSizes] = useItemSizes();

  async function incQuantity() {
    try {
      const updatedCartItem = await incItemQuantity(cartItem.id);
      console.log(updatedCartItem);

      setCartItems((items) =>
        items.map((item) =>
          item.id === cartItem.id ? { ...item, ...updatedCartItem } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }

  async function decQuantity() {
    try {
      const updatedCartItem = await decItemQuantity(cartItem.id);
      console.log(updatedCartItem);

      setCartItems((items) =>
        items.map((item) =>
          item.id === cartItem.id ? { ...item, ...updatedCartItem } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }

  async function changeSize(sizeId, sizeName) {
    const { size_id, price } = await changeItemSize(
      cartItem.item.id,
      cartItem.id,
      sizeId,
    );
    setCartItems((items) =>
      items.map((item) =>
        item.id === cartItem.id
          ? {
              ...item,
              price,
              price_per_quantity: price * item.quantity,
              size_id,
              size: { id: sizeId, size: sizeName },
            }
          : item,
      ),
    );
  }

  async function deleteItem() {
    await deleteCartItem(cartItem.id);
    setCartItems((items) => items.filter((item) => item.id !== cartItem.id));
  }

  useEffect(
    function () {
      fetchItemSizes(cartItem.item_id);
      // fetchCart();
    },
    [cartItem],
  );

  return (
    <>
      <div className="mb-6 flex items-center gap-10 rounded-md p-5">
        <>
          <BiTrash
            size={25}
            className="text-gradient-2 cursor-pointer duration-300 hover:rotate-180"
            onClick={deleteItem}
          />
          <img
            src={cartItem.item.image}
            className="h-[80px] w-[90px] rounded-md object-cover"
            alt=""
          />
          <div>
            <p>{cartItem.item.name}</p>
            <p>@ ${cartItem.price}</p>
          </div>
          <div className="flex items-center justify-between gap-5">
            <select
              name=""
              id=""
              value={cartItem.size_id}
              onChange={(e) => {
                changeSize(
                  e.target.value,
                  e.target.options[e.target.selectedIndex].text,
                );
              }}
            >
              {itemSizes.map((size, i) => (
                <option key={i} value={size.size_id}>
                  {size.size.name}
                </option>
              ))}
            </select>

            <ItemQuantity
              quantity={cartItem.quantity}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
            />
            <p>${cartItem.price_per_quantity}</p>
          </div>
        </>
      </div>
    </>
  );
}

export default CartItem;
