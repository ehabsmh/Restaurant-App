import Sidebar from "./Sidebar";
import Items from "../components/Items";
import ItemDetails from "../components/ItemDetails";
import Navbar from "./Navbar";
import useItemInfo from "../hooks/useItemInfo";

function AppLayout() {
  const { activeItem } = useItemInfo();

  return (
    <div className="h-[inherit] lg:flex lg:justify-between lg:gap-8">
      <Sidebar />
      <div className="lg:flex lg:grow lg:flex-col">
        <Navbar />
        <div className="lg:flex lg:grow">
          <Items />
          {activeItem && <ItemDetails />}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
