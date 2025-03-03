import { useEffect, useState } from "react";
import { IItems } from "./Items";

type ItemDescriptionProps = {
  activeItem: IItems;
};
function ItemDescription({ activeItem }: ItemDescriptionProps) {
  const [fullDescription, setFullDescription] = useState(false);
  const itemDescription =
    !fullDescription && activeItem?.description
      ? activeItem.description.split(" ").slice(0, 5).join(" ") + "..."
      : activeItem?.description;

  useEffect(
    function () {
      setFullDescription(false);
    },
    [activeItem],
  );

  console.log(itemDescription);

  if (!itemDescription) return null;
  return (
    <div className="flex max-w-[400px] items-center self-start">
      <p className="text-main-active lg:text-main-inactive">
        <span className="font-bold text-white lg:text-black">
          Description:{" "}
        </span>{" "}
        {itemDescription}
      </p>
      <p
        className="text-main-active lg:text-main-inactive ml-5 cursor-pointer text-sm underline duration-300 hover:text-black"
        onClick={() => setFullDescription((full) => !full)}
      >
        {fullDescription ? "see less" : "see more"}
      </p>
    </div>
  );
}

export default ItemDescription;
