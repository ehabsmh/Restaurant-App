import { useEffect, useState } from "react";
import { useItemInfo } from "../contexts/ItemInfoContext";
import ItemQuantity from "./ItemQuantity";
import ItemSizes from "./ItemSizes";
import supabase from "../services/supabase";
import AddToCart from "../features/cart/AddToCart";
import AddToFavorite from "../features/favorite/AddToFavorite";
import { addItem, checkItemInCart } from "../services/apiCart";
import { useSelector } from "react-redux";
import { getCart } from "../features/cart/CartSlice";
import ItemIngredients from "./ItemIngredients";
import ItemDescription from "./ItemDescription";

function ItemDetails() {
  const { activeItem } = useItemInfo();

  const [itemInCart, setItemInCart] = useState(false);

  const [activeItemPrice, setActiveItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSizeId, setActiveSizeId] = useState(1);
  const cartId = useSelector(getCart)?.id;

  // See more & See less for description

  function handleActiveItemPrice(price: number) {
    setActiveItemPrice(price);
  }
  function handleQuantity(quantity: number) {
    if (quantity < 1) setQuantity(1);
    setQuantity(quantity);
  }
  function incQuantity() {
    setQuantity((quantity) => quantity + 1);
  }

  function decQuantity() {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  }

  async function addToCart() {
    const item = {
      item_id: activeItem?.id,
      cart_id: cartId,
      size_id: activeSizeId,
      price: activeItemPrice,
      quantity: quantity,
      price_per_quantity: quantity * activeItemPrice,
    };
    addItem(item);
  }

  useEffect(
    function () {
      async function itemExistsCheck() {
        const isInCart = await checkItemInCart(activeItem?.id);
        setItemInCart(isInCart);
      }

      itemExistsCheck();
    },
    [activeItem],
  );

  if (!activeItem) return null;

  return (
    <div className="ml-8 hidden h-[85vh] grow overflow-y-auto lg:mt-7 lg:block">
      <div className="before:bg-body relative mx-auto flex w-[90%] flex-col items-center justify-center gap-3 before:absolute before:-left-5 before:bottom-0 before:top-0 before:w-0.5">
        <img
          src={activeItem.image}
          alt={activeItem.name}
          className="h-[330px] w-[450px] rounded-md"
        />
        <p className="mb-5">{activeItem.name}</p>

        <ItemIngredients activeItem={activeItem} />

        <ItemDescription activeItem={activeItem} />

        {!itemInCart && (
          <ItemQuantity
            incQuantity={incQuantity}
            decQuantity={decQuantity}
            onChange={handleQuantity}
            quantity={quantity}
          />
        )}

        {!itemInCart && (
          <ItemSizes
            itemId={activeItem.id}
            handleActiveItemPrice={handleActiveItemPrice}
            activeSizeId={activeSizeId}
            setActiveSizeId={setActiveSizeId}
          />
        )}
        <div className="mt-10 flex w-[50%] justify-between">
          {!itemInCart && <AddToCart addToCart={addToCart} />}
          {itemInCart && (
            <p className="text-sm font-bold">Already in your cart</p>
          )}
          <AddToFavorite />
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
