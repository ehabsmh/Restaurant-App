import { useItemInfo } from "../contexts/ItemInfoContext";
import { ICategory } from "./Categories";

type CategoryProps = {
  category: ICategory;
};

function Category({ category }: CategoryProps) {
  const { activeCategory, handleActiveCategory } = useItemInfo();

  return (
    <li
      onClick={() => {
        handleActiveCategory(category.id);
      }}
      className={`cursor-pointer ${activeCategory === category.id ? "from-gradient-1 to-gradient-2 rounded-md bg-gradient-to-br" : ""} mb-10 flex h-16 w-16 flex-col items-center justify-center`}
    >
      <img src={category.icon} alt={category.name} className="w-9" />
      <p
        className={`${activeCategory === category.id ? "text-white" : "text-main-inactive"} text-sm`}
      >
        {category.name}
      </p>
    </li>
  );
}

export default Category;
