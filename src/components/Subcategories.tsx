import { useEffect, useState } from "react";
import { useItemInfo } from "../contexts/ItemInfoContext";
import Subcategory from "./Subcategory";
import supabase from "../services/supabase";
import Loader from "../ui/Loader";

export interface ISubcategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

function Subcategories() {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { activeCategory } = useItemInfo();

  useEffect(
    function () {
      async function fetchSubcategories() {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from("subcategories")
            .select(
              `id, name, icon,slug
        `,
            )
            .eq("category_id", activeCategory);

          if (error) throw new Error(error.message);

          setSubcategories(data);
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
