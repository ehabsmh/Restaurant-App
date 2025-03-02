import Sidebar from "./Sidebar";
import Items from "../components/Items";
import ItemDetails from "../components/ItemDetails";
import Navbar from "./Navbar";
import useItemInfo from "../hooks/useItemInfo";
import { GrClose } from "react-icons/gr";

function AppLayout() {
  const { activeItem, handleActiveItem } = useItemInfo();

  return (
    <div className="h-[inherit] lg:flex lg:justify-between lg:gap-8">
      <Sidebar />
      <div className="lg:flex lg:grow lg:flex-col">
        <Navbar />
        {/* Big screens */}
        <div className="hidden lg:flex lg:grow">
          <Items />
          {activeItem && <ItemDetails imgHeight="330" imgWidth="450" />}
        </div>
        {/* Small/Medium screens */}
        <div className="relative lg:hidden">
          <Items />
          {activeItem && (
            <div className="to-gradient-2 from-gradient-1 absolute bottom-0 left-0 right-0 top-0 overflow-auto bg-gradient-to-bl p-3">
              <GrClose
                className="absolute right-2 text-white"
                size={20}
                onClick={() => handleActiveItem(null)}
              />
              {activeItem && <ItemDetails imgHeight="150" imgWidth="200" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
