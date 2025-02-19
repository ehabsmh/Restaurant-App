import ItemInfoContext from "../contexts/ItemInfoContext";
import useItemInfo from "../hooks/useItemInfo";
import { IItems } from "./Items";

type ItemProps = {
  item: IItems;
};

function Item({ item }: ItemProps) {
  const { handleActiveItem, activeItem } = useItemInfo(ItemInfoContext);
  return (
    <div className="relative max-w-[250px] lg:w-full">
      <img
        src={item.image}
        alt={item.name}
        onClick={() => handleActiveItem(item)}
        className={`${activeItem?.id === item.id ? "border-gradient-1 border shadow-lg" : ""} hover:border-gradient-1 lg:min-w-auto h-[200px] min-w-[250px] cursor-pointer rounded-md hover:border lg:h-[200px] lg:w-[250px]`}
      />
      <p className="text-secondary mt-2 w-full">{item.name}</p>
    </div>
  );
}

export default Item;
