import Item from "./Item";
import { useItemInfo } from "../contexts/ItemInfoContext";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import Loader from "../ui/Loader";
import SmallScreenCategories from "../ui/SmallScreenCategories";

export interface IItems {
  id: number;
  category_id: number;
  subcategory_id: number;
  name: string;
  slug: string;
  image: string;
  description: string | null;
  created_at: string;
}

function Items() {
  const { activeCategory, activeSubcategory } = useItemInfo();
  const [items, setItems] = useState<IItems[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      setItems([]);
      async function fetchItems() {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from("items")
            .select("*")
            .eq("category_id", activeCategory)
            .eq("subcategory_id", activeSubcategory);

          if (error) throw new Error(error.message);

          setItems(data);
          console.log(data);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
        } finally {
          setIsLoading(false);
          setError("");
        }
      }
      fetchItems();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSubcategory],
  );

  return (
    <>
      <SmallScreenCategories />
      <div className="flex h-fit flex-col items-center overflow-auto px-5 lg:ml-10 lg:mt-7 lg:h-4/5 lg:p-0">
        {isLoading && <Loader color="#ed4b74" />}

        <div
          id="items"
          className="mt-5 flex w-full items-center justify-between gap-5 lg:mt-0 lg:grid lg:grid-cols-3"
        >
          {!isLoading &&
            !error &&
            items.map((item) => <Item key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Items;
