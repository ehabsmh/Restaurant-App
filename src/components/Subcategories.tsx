import { useEffect, useState } from "react";
import Subcategory from "./Subcategory";
import Loader from "../ui/Loader";
import { getSubCategories } from "../services/apiSubcategories";
import useItemInfo from "../hooks/useItemInfo";
import ItemInfoContext from "../contexts/ItemInfoContext";

export interface ISubcategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

function Subcategories() {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { activeCategory } = useItemInfo(ItemInfoContext);

  useEffect(
    function () {
      async function fetchSubcategories() {
        setIsLoading(true);
        try {
          const subcategories = await getSubCategories(activeCategory);

          setSubcategories(subcategories);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchSubcategories();
    },
    [activeCategory],
  );

  return (
    <div className="lg:from-gradient-1 lg:to-gradient-2 mt-3 overflow-auto lg:flex lg:h-1/2 lg:w-28 lg:flex-col lg:items-center lg:rounded-r-md lg:bg-gradient-to-br">
      {isLoading && <Loader color="#ffdfdf" />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul className="mt-5 flex gap-5 lg:flex-col">
          {subcategories.map((subcategory) => (
            <Subcategory key={subcategory.id} subcategory={subcategory} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Subcategories;
