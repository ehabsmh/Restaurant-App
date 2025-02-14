import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import supabase from "../services/supabase";

type ItemQuantityProps = {
  itemId: number;
};
function ItemQuantity({ itemId }: ItemQuantityProps) {
  return (
    <div className="items-between border-gradient-1 flex justify-between rounded-md border bg-white">
      <input
        type="text"
        defaultValue={1}
        size={1}
        className="text-center outline-0"
      />
      <div className="lg:from-gradient-1 lg:to-gradient-2 bg-gradient-to-br px-2">
        <FaAngleUp
          size={18}
          className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
        />
        <FaAngleDown
          size={18}
          className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
        />
      </div>
    </div>
  );
}

export default ItemQuantity;
