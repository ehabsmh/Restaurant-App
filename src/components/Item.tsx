import { IItems } from "./Items";

type ItemProps = {
  item: IItems;
};

function Item({ item }: ItemProps) {
  return (
    <div className="relative w-4/5 cursor-pointer lg:h-auto lg:w-full">
      <img
        src={item.image}
        alt={item.name}
        className="rounded-md lg:h-[200px] lg:w-[250px]"
      />
      <p>{item.name}</p>
    </div>
  );
}

export default Item;
