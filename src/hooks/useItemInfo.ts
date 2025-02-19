import { useContext } from "react";
import { ItemInfoContextType } from "../contexts/ItemInfoContext";

export default function useItemInfo(ItemInfoContext: React.Context<ItemInfoContextType | null>) {
  const context = useContext(ItemInfoContext);
  if (!context)
    throw new Error("ItemInfoContext were used outside the ItemInfoProvider");

  return context;
}
