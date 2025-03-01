/* eslint-disable react-refresh/only-export-components */
import { useEffect, useReducer, useState } from "react";
import ItemQuantity from "./ItemQuantity";
import ItemSizes from "./ItemSizes";
import AddToCart from "../features/cart/AddToCart";
import { addItem, checkItemInCart } from "../services/apiCart";
import ItemIngredients from "./ItemIngredients";
import ItemDescription from "./ItemDescription";
import useItemInfo from "../hooks/useItemInfo";
import useAuth from "../hooks/useAuth";

type ItemDetailsInitState = {
  quantity: number;
  activeSizeId: number;
  activeItemPrice: number;
};

export enum ActionType {
  incQuantity = "incQuantity",
  decQuantity = "decQuantity",
  addVariant = "addVariant",
  reset = "reset",
}

export interface Action {
  type: ActionType;
  payload?: { itemSizeId: number; itemPrice: number };
}

const initialState: ItemDetailsInitState = {
  quantity: 1,
  activeSizeId: 1,
  activeItemPrice: 0,
};

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

function reducer(state: ItemDetailsInitState, action: Action) {
  switch (action.type) {
    case ActionType.incQuantity:
      if (state.quantity === MAX_QUANTITY)
        return { ...state, quantity: state.quantity };
      return {
        ...state,
        quantity: state.quantity < 1 ? 1 : state.quantity + 1,
      };

    case ActionType.decQuantity:
      if (state.quantity === MIN_QUANTITY)
        return { ...state, quantity: state.quantity };

      return {
        ...state,
        quantity: state.quantity < 1 ? state.quantity : state.quantity - 1,
      };

    case ActionType.addVariant:
      return {
        ...state,
        activeSizeId: action.payload?.itemSizeId ?? state.activeSizeId,
        activeItemPrice: action.payload?.itemPrice ?? state.activeItemPrice,
      };

    case ActionType.reset:
      return initialState;

    default:
      return state;
  }
}

type ItemDetailsProps = {
  imgWidth: number;
  imgHeight: number;
};
function ItemDetails({ imgWidth, imgHeight }: ItemDetailsProps) {
  const [itemInCart, setItemInCart] = useState(false);
  const [{ quantity, activeSizeId, activeItemPrice }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { activeItem } = useItemInfo();
  const { userCartId } = useAuth();

  async function addToCart() {
    if (userCartId && activeItem?.id) {
      const item = {
        cart_id: userCartId,
        item_id: activeItem.id,
        size_id: activeSizeId,
        price: activeItemPrice,
        quantity: quantity,
        price_per_quantity: quantity * activeItemPrice,
      };

      addItem(item);
    }
  }

  useEffect(
    function () {
      async function itemExistsCheck() {
        if (userCartId && activeItem) {
          const isInCart = await checkItemInCart(userCartId, activeItem.id);
          setItemInCart(isInCart);
        }
      }

      itemExistsCheck();
      dispatch({ type: ActionType.reset });
    },
    [activeItem, userCartId],
  );

  if (!activeItem) return null;

  return (
    <div className="grow overflow-y-auto lg:ml-8 lg:mt-7 lg:block lg:h-[70vh]">
      <div className="before:bg-body relative mx-auto flex w-[90%] flex-col items-center justify-center gap-3 before:absolute before:-left-5 before:bottom-0 before:top-0 before:w-0.5">
        <img
          src={activeItem.image}
          alt={activeItem.name}
          className={`h-[${imgHeight}px] w-[${imgWidth}px] mt-7 rounded-md lg:mt-0`}
        />
        <p className="text-main mb-5 lg:text-black">{activeItem.name}</p>

        <ItemIngredients activeItem={activeItem} />

        <ItemDescription activeItem={activeItem} />

        {!itemInCart && (
          <ItemQuantity dispatch={dispatch} quantity={quantity} />
        )}

        {!itemInCart && (
          <ItemSizes
            itemId={activeItem.id}
            activeSizeId={activeSizeId}
            dispatch={dispatch}
          />
        )}
        <div className="mt-10 flex w-[50%] justify-between">
          {!itemInCart && (
            <AddToCart addToCart={addToCart} setItemInCart={setItemInCart} />
          )}
          {itemInCart && (
            <p className="text-sm font-bold">Already in your cart</p>
          )}
          {/* <AddToFavorite /> */}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
