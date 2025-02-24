import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import { IItems } from "./Items";

type ItemIngredientsProps = {
  activeItem: IItems;
};

function ItemIngredients({ activeItem }: ItemIngredientsProps) {
  const [ingredients, setIngredients] = useState("");

  useEffect(
    function () {
      async function fetchActiveItemIngredients() {
        if (!activeItem) return;

        const { data: item_ingredients } = await supabase
          .from("item_ingredients")
          .select(`ingredient:ingredients (name)`)
          .eq("item_id", activeItem.id);

        if (item_ingredients) {
          const ingredientsList = item_ingredients?.map(
            (itemIngredient) => itemIngredient.ingredient.name,
          );
          setIngredients(ingredientsList?.join(", "));
        }
      }
      fetchActiveItemIngredients();
    },
    [activeItem],
  );

  if (!ingredients) return null;

  return (
    <div className="flex max-w-[400px] items-center self-start">
      <p className="text-main-inactive">
        <span className="font-bold text-black">Ingredients: </span>{" "}
        {ingredients}
      </p>
    </div>
  );
}

export default ItemIngredients;
