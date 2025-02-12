import { useEffect, useState } from "react";
import Category from "./Category";
import supabase from "../services/supabase";
import Loader from "./../ui/Loader";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
}

// type CategoriesProps = {
//   activeCategory: number | null;
//   handleActiveCategory: (id: number) => void;
// };

function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function fetchCategories() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw new Error(error.message);

      console.log(data);
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
      setError("");
    }
  }

  useEffect(function () {
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading && <Loader color="#ed4b74" />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && (
        <nav id="categories">
          <ul className="flex items-center justify-center overflow-auto lg:block">
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Categories;
