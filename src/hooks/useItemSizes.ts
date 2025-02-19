import { useCallback, useState } from "react";
import supabase from "../services/supabase";

interface IItemSize {
  size_id: number;
  price: number;
  size: { name: string };
}

type useItemSizesReturn = [IItemSize[], (itemId: number) => Promise<void>];

function useItemSizes(): useItemSizesReturn {
  const [itemSizes, setItemSizes] = useState<IItemSize[]>([]);

  const fetchItemSizes = useCallback(async function fetchItemSizes(itemId: number) {
    try {
      const { data, error } = await supabase
        .from("item_sizes")
        .select(
          `
  size_id,
  price,
  size:sizes (
    name:size
  )
`,
        )
        .eq("item_id", itemId);
      if (error) throw new Error(error.message);

      data?.sort((a, b) => a.price - b.price);
      setItemSizes(data);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }, [])


  return [itemSizes, fetchItemSizes];
}


export default useItemSizes
