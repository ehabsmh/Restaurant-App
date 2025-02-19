import { createContext, ReactNode, useState } from "react";
import { IItems } from "../components/Items";

export interface ItemInfoContextType {
  activeCategory: number;
  handleActiveCategory: (id: number) => void;
  activeSubcategory: number;
  handleActiveSubcategory: (id: number) => void;
  activeItem: IItems | null;
  handleActiveItem: (item: IItems | null) => void;
}

const ItemInfoContext = createContext<ItemInfoContextType | null>(null);

function ItemInfoProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeSubcategory, setActiveSubcategory] = useState<number>(1);
  const [activeItem, setActiveItem] = useState<IItems | null>(null);

  function handleActiveCategory(id: number) {
    setActiveCategory(id);
  }
  function handleActiveSubcategory(id: number) {
    setActiveSubcategory(id);
  }

  function handleActiveItem(item: IItems | null) {
    setActiveItem(item);
  }

  const value = {
    activeCategory,
    handleActiveCategory,
    activeSubcategory,
    handleActiveSubcategory,
    activeItem,
    handleActiveItem,
  };

  return (
    <ItemInfoContext.Provider value={value}>
      {children}
    </ItemInfoContext.Provider>
  );
}

export { ItemInfoProvider };
export default ItemInfoContext;
