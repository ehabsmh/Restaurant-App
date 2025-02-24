import { useContext } from "react";
import ItemInfoContext from "../contexts/ItemInfoContext";

export default function useItemInfo() {
  const context = useContext(ItemInfoContext);
  if (!context)
    throw new Error("ItemInfoContext were used outside the ItemInfoProvider");

  return context;
}
