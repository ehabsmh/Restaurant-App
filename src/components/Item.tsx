import { useItemInfo } from "../contexts/ItemInfoContext";
import { IItems } from "./Items";

type ItemProps = {
  item: IItems;
};

function Item({ item }: ItemProps) {
  const { handleActiveItem, activeItem } = useItemInfo();
  return (
    <div className="relative w-[250px] lg:w-full">
      <img
        src={item.image}
        alt={item.name}
        onClick={() => handleActiveItem(item)}
        className={`${activeItem?.id === item.id ? "border-gradient-1 border" : ""} hover:border-gradient-1 lg:min-w-auto h-[200px] min-w-[250px] cursor-pointer rounded-md hover:border lg:h-[200px] lg:w-[250px]`}
      />
      <p className="text-secondary w-full">{item.name}</p>
    </div>
  );
}

export default Item;
