import { FiArrowRight } from "react-icons/fi";
import Item from "./Item";
import { useItemInfo } from "../contexts/ItemInfoContext";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import Loader from "../ui/Loader";

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
      <div className="flex h-4/5 flex-col items-center lg:ml-10">
        {isLoading && <Loader color="#ed4b74" />}
        <div className="mb-10 flex w-80 items-center justify-between lg:hidden">
          <div className="cursor-pointer">
            <p className="text-main-inactive text-sm">Choose Category:</p>
            <p className="text-secondary font-bold">Foods</p>
          </div>
          <FiArrowRight />
          <div className="cursor-pointer">
            <p className="text-main-inactive text-sm">Choose subcategory:</p>
            <p className="text-secondary font-bold">Pasta</p>
          </div>
        </div>
        <div
          id="items"
          className="mt-10 flex w-full flex-col items-center overflow-auto lg:grid lg:grid-cols-3 lg:gap-5"
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
