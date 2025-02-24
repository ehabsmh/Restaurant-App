import { useEffect, useState } from "react";
import Category from "./Category";
import Loader from "./../ui/Loader";
import { getCategories } from "../services/apiCategories";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
}

function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCategories() {
    setIsLoading(true);
    try {
      const categories = await getCategories();
      setCategories(categories);
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
          <ul className="flex gap-5 overflow-auto lg:block">
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
