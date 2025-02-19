import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Action, ActionType } from "./ItemDetails";

type ItemQuantityProps = {
  quantity: number;
  dispatch?: React.ActionDispatch<[action: Action]>;
  incQuantity?: () => void;
  decQuantity?: () => void;
};
function ItemQuantity({
  dispatch,
  quantity,
  incQuantity,
  decQuantity,
}: ItemQuantityProps) {
  return (
    <div className="items-between border-gradient-1 flex justify-between rounded-md border bg-white">
      <input
        type="text"
        value={quantity}
        size={1}
        disabled={true}
        className="text-center outline-0"
      />
      <div
        className={`lg:from-gradient-1 lg:to-gradient-2 flex h-9 flex-col ${quantity === 10 ? "justify-end" : "justify-start"} bg-gradient-to-br px-2`}
      >
        {quantity < 10 && (
          <FaAngleUp
            size={18}
            className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
            onClick={() =>
              dispatch !== undefined
                ? dispatch({ type: ActionType.incQuantity })
                : incQuantity && incQuantity()
            }
          />
        )}
        {quantity > 1 && (
          <FaAngleDown
            size={18}
            className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
            onClick={() =>
              dispatch !== undefined
                ? dispatch({ type: ActionType.decQuantity })
                : decQuantity && decQuantity()
            }
          />
        )}
      </div>
    </div>
  );
}

export default ItemQuantity;
