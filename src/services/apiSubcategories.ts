import supabase from "./supabase";

export async function getSubCategories(categoryId: number) {
  const { data: subcategories, error } = await supabase
    .from("subcategories")
    .select(
      `id, name, icon,slug
        `,
    )
    .eq("category_id", categoryId);

  if (error) throw new Error(error.message);

  return subcategories;
}
