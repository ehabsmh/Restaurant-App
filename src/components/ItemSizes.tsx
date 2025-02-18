import { useEffect, useState } from "react";
import useItemSizes from "../hooks/useItemSizes";

// interface IItemSize {
//   price: number;
//   sizes: { size: string };
// }

type ItemSizesProps = {
  itemId: number;
};
function ItemSizes({
  itemId,
  handleActiveItemPrice,
  activeSizeId,
  setActiveSizeId,
}: ItemSizesProps) {
  // const [isLoading, setIsLoading] = useState(false);

  const [itemSizes, fetchItemSizes] = useItemSizes();

  useEffect(
    function () {
      fetchItemSizes(itemId);
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
                className={`border-gradient-1 text-main-inactive cursor-pointer border p-2 text-sm ${activeSizeId === size.size_id ? "text-secondary bg-main-active" : ""}`}
                onClick={() => {
                  setActiveSizeId(size.size_id);
                  handleActiveItemPrice(size.price);
                }}
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
                className={`${activeSizeId === size.size_id ? "text-secondary" : ""} border-gradient-1 text-main-inactive border p-2 text-sm`}
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
