import { useEffect } from "react";
import useItemSizes from "../hooks/useItemSizes";
import { Action, ActionType } from "./ItemDetails";

type ItemSizesProps = {
  itemId: number;
  activeSizeId: number;
  dispatch: React.ActionDispatch<[action: Action]>;
};
function ItemSizes({ itemId, activeSizeId, dispatch }: ItemSizesProps) {
  const [itemSizes, fetchItemSizes] = useItemSizes();

  useEffect(
    function () {
      fetchItemSizes(itemId);
    },
    [itemId, fetchItemSizes],
  );

  useEffect(
    function () {
      if (itemSizes.length) {
        const defaultItemSize = itemSizes.at(0)!;
        dispatch({
          type: ActionType.addVariant,
          payload: {
            itemPrice: defaultItemSize.price,
            itemSizeId: defaultItemSize.size_id,
          },
        });
      }
    },
    [dispatch, itemSizes],
  );

  return (
    <div>
      <table className="text-center">
        <thead>
          <tr>
            {itemSizes.map((size, i) => (
              <th
                key={i}
                className={`border-gradient-1 cursor-pointer border p-2 text-sm ${activeSizeId === size.size_id ? "bg-main-active text-secondary" : "text-main-active lg:text-main-inactive"}`}
                onClick={() =>
                  dispatch({
                    type: ActionType.addVariant,
                    payload: {
                      itemSizeId: size.size_id,
                      itemPrice: size.price,
                    },
                  })
                }
              >
                {size.size.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {itemSizes.map((size, i) => (
              <td
                key={i}
                className={`${activeSizeId === size.size_id ? "text-secondary font-bold" : "text-main-active lg:text-main-inactive"} border-gradient-1 border p-2 text-sm lg:font-normal`}
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
