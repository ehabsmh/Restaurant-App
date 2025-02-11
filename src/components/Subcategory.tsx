import { useItemInfo } from "../contexts/ItemInfoContext";
import { ISubcategory } from "./Subcategories";

type SubcategoryProps = {
  subcategory: ISubcategory;
};

function Subcategory({ subcategory }: SubcategoryProps) {
  const { activeSubcategory, handleActiveSubcategory } = useItemInfo();

  return (
    <li
      onClick={() => {
        handleActiveSubcategory(subcategory.id);
      }}
      className={`cursor-pointer ${activeSubcategory === subcategory.id ? "bg-main-active/45 rounded-md" : ""} mb-10 flex w-16 flex-col items-center justify-between`}
    >
      <img src={subcategory.icon} alt={subcategory.name} className="w-9" />
      <p
        className={`${activeSubcategory === subcategory.id ? "text-white" : "text-main-active"} text-center text-sm`}
      >
        {subcategory.name}
      </p>
    </li>
  );
}

export default Subcategory;
