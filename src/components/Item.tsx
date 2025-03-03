import useItemInfo from "../hooks/useItemInfo";
import { IItems } from "./Items";

function Item({ item }: { item: IItems }) {
  const { handleActiveItem, activeItem } = useItemInfo();
  return (
    <div className="relative max-w-[250px] lg:w-full">
      <img
        src={item.image}
        alt={item.name}
        onClick={() => handleActiveItem(item)}
        className={`${activeItem?.id === item.id ? "border-gradient-1 border shadow-lg" : ""} hover:border-gradient-1 lg:min-w-auto h-[200px] min-w-[250px] cursor-pointer rounded-md object-cover hover:border lg:h-[200px] lg:w-[250px]`}
      />
      <p className="text-secondary mt-2 w-full">{item.name}</p>
    </div>
  );
}

export default Item;
