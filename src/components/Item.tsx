import { IItems } from "./Items";

type ItemProps = {
  item: IItems;
};

function Item({ item }: ItemProps) {
  return (
    <div className="relative w-[250px] cursor-pointer lg:h-auto lg:w-full">
      <img
        src={item.image}
        alt={item.name}
        className="h-[200px] min-w-[250px] max-w-[250px] rounded-md lg:h-[200px] lg:w-[250px]"
      />
      <p className="text-secondary">{item.name}</p>
    </div>
  );
}

export default Item;
