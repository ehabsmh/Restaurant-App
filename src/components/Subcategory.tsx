import { useItemInfo } from "../contexts/ItemInfoContext";
import { ISubcategory } from "./Subcategories";

type SubcategoryProps = {
  subcategory: ISubcategory;
};

function Subcategory({ subcategory }: SubcategoryProps) {
  const { activeSubcategory, handleActiveSubcategory, handleActiveItem } =
    useItemInfo();

  return (
    <li
      onClick={() => {
        handleActiveItem(null);
        handleActiveSubcategory(subcategory.id);
      }}
      className={`cursor-pointer ${activeSubcategory === subcategory.id ? "lg:bg-main-active/45 from-gradient-1 to-gradient-2 rounded-md bg-gradient-to-br lg:bg-none" : ""} mb-5 flex flex-col items-center justify-center p-5 lg:mb-10 lg:h-16 lg:w-16`}
    >
      <img
        src={subcategory.icon}
        alt={subcategory.name}
        className="w-6 lg:w-9"
      />
      <p
        className={`${activeSubcategory === subcategory.id ? "text-white" : "lg:text-main-active text-main-inactive"} text-center text-xs lg:text-sm`}
      >
        {subcategory.name}
      </p>
    </li>
  );
}

export default Subcategory;
