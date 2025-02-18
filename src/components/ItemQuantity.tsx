import { FaAngleDown, FaAngleUp } from "react-icons/fa";

type ItemQuantityProps = {
  quantity: number;
  incQuantity: () => void;
  decQuantity: () => void;
  onChange: (quantity: number) => void;
};
function ItemQuantity({
  incQuantity,
  decQuantity,
  quantity,
  onChange,
}: ItemQuantityProps) {
  return (
    <div className="items-between border-gradient-1 flex justify-between rounded-md border bg-white">
      <input
        type="text"
        value={quantity}
        onChange={(e) => onChange(Math.abs(parseInt(e.target.value)))}
        size={1}
        className="text-center outline-0"
      />
      <div className="lg:from-gradient-1 lg:to-gradient-2 bg-gradient-to-br px-2">
        <FaAngleUp
          size={18}
          className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
          onClick={incQuantity}
        />
        <FaAngleDown
          size={18}
          className="text-main-active cursor-pointer duration-150 hover:text-white active:text-white"
          onClick={decQuantity}
        />
      </div>
    </div>
  );
}

export default ItemQuantity;
