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
import { ICartItem } from "./Cart";

type CartItemProps = {
  cartItem: ICartItem;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

function CartItem({ cartItem, setCartItems }: CartItemProps) {
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

  async function changeSize(sizeId: number, sizeName: string) {
    const updatedItem = await changeItemSize(
      cartItem.item.id,
      cartItem.id,
      sizeId,
    );

    if (updatedItem) {
      const { size_id, price } = updatedItem;

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
  }

  async function deleteItem() {
    await deleteCartItem(cartItem.id);
    setCartItems((items) => items.filter((item) => item.id !== cartItem.id));
  }

  useEffect(
    function () {
      fetchItemSizes(cartItem.item_id);
    },
    [cartItem, fetchItemSizes],
  );

  return (
    <div className="mb-10 grid grid-cols-3 items-center gap-4 rounded-md lg:mb-6 lg:grid-cols-5 lg:gap-10 lg:p-5">
      <div className="grid grid-cols-2 items-center gap-5">
        <BiTrash
          size={25}
          className="text-gradient-2 cursor-pointer duration-300 hover:rotate-180"
          onClick={deleteItem}
        />
        <img
          src={cartItem.item.image}
          className="h-[50px] w-[70px] rounded-md object-cover lg:h-[80px] lg:w-[90px]"
          alt=""
        />
      </div>
      <div className="text-sm">
        <p>{cartItem.item.name}</p>
        <p>@ ${cartItem.price}</p>
      </div>

      {itemSizes.length ? (
        <select
          className="w-fit cursor-pointer p-3 text-sm outline-0"
          name=""
          id=""
          value={cartItem.size_id}
          onChange={(e) => {
            changeSize(
              +e.target.value,
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
      ) : (
        <div></div>
      )}

      <ItemQuantity
        quantity={cartItem.quantity}
        incQuantity={incQuantity}
        decQuantity={decQuantity}
      />
      <p className="text-sm">${cartItem.price_per_quantity}</p>
    </div>
  );
}

export default CartItem;
