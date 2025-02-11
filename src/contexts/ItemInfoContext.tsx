import { createContext, ReactNode, useContext, useState } from "react";

interface ItemInfoContextType {
  activeCategory: number;
  handleActiveCategory: (id: number) => void;
  activeSubcategory: number;
  handleActiveSubcategory: (id: number) => void;
}

const ItemInfoContext = createContext<ItemInfoContextType | null>(null);

function ItemInfoProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeSubcategory, setActiveSubcategory] = useState<number>(1);

  function handleActiveCategory(id: number) {
    setActiveCategory(id);
  }
  function handleActiveSubcategory(id: number) {
    setActiveSubcategory(id);
  }

  const value = {
    activeCategory,
    handleActiveCategory,
    activeSubcategory,
    handleActiveSubcategory,
  };

  return (
    <ItemInfoContext.Provider value={value}>
      {children}
    </ItemInfoContext.Provider>
  );
}

function useItemInfo() {
  const context = useContext(ItemInfoContext);
  if (!context)
    throw new Error("ItemInfoContext were used outside the ItemInfoProvider");

  return context;
}

export { ItemInfoProvider, useItemInfo };
