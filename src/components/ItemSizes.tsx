import { useEffect, useState } from "react";
import supabase from "../services/supabase";

interface IItemSize {
  price: number;
  sizes: { size: string };
}

type ItemSizesProps = {
  itemId: number;
};
function ItemSizes({ itemId }: ItemSizesProps) {
  // const [isLoading, setIsLoading] = useState(false);
  const [itemSizes, setItemSizes] = useState<IItemSize[]>([]);
  const [activeSize, setActiveSize] = useState(0);

  useEffect(
    function () {
      async function fetchItemSizes() {
        try {
          const { data, error } = await supabase
            .from("item_sizes")
            .select(
              `
      price,
      sizes (
        size
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
      }
      fetchItemSizes();
    },
    [itemId],
  );

  return (
    <div>
      <table className="text-center">
        <thead>
          <tr>
            {itemSizes.map((size, i) => (
              <th
                key={i}
                className={`border-gradient-1 text-main-inactive cursor-pointer border p-2 text-sm ${activeSize === i ? "text-secondary bg-main-active" : ""}`}
                onClick={() => setActiveSize(i)}
              >
                {size.sizes.size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {itemSizes.map((size, i) => (
              <td
                key={i}
                className={`${activeSize === i ? "text-secondary" : ""} border-gradient-1 text-main-inactive border p-2 text-sm`}
              >
                ${size.price}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ItemSizes;
