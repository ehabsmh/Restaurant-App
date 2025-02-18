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

function ItemDetails() {
  const { activeItem } = useItemInfo();
  const [fullDescription, setFullDescription] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [itemInCart, setItemInCart] = useState(false);

  const [activeItemPrice, setActiveItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSizeId, setActiveSizeId] = useState(1);
  const cartId = useSelector(getCart)?.id;

  // See more & See less for description
  const itemDescription = !fullDescription
    ? activeItem?.description?.split(" ").slice(0, 5).join(" ") + "..."
    : activeItem?.description;

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

  useEffect(
    function () {
      async function fetchActiveItemIngredients() {
        if (!activeItem) return;

        const { data: item_ingredients } = await supabase
          .from("item_ingredients")
          .select(`ingredient:ingredients (name)`)
          .eq("item_id", activeItem.id);

        if (item_ingredients) {
          const ingredientsList = item_ingredients?.map(
            (itemIngredient) => itemIngredient.ingredient.name,
          );
          setIngredients(ingredientsList?.join(", "));
        }
      }
      fetchActiveItemIngredients();
    },
    [activeItem],
  );

  useEffect(
    function () {
      setFullDescription(false);
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
        <div className="flex max-w-[400px] items-center self-start">
          <p className="text-main-inactive">
            <span className="font-bold text-black">Ingredients: </span>{" "}
            {ingredients}
          </p>
        </div>
        <div className="flex max-w-[400px] items-center self-start">
          <p className="text-main-inactive">
            <span className="font-bold text-black">Description: </span>{" "}
            {itemDescription}
          </p>
          <p
            className="text-main-inactive ml-5 cursor-pointer text-sm underline duration-300 hover:text-black"
            onClick={() => setFullDescription((full) => !full)}
          >
            {fullDescription ? "see less" : "see more"}
          </p>
        </div>

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
