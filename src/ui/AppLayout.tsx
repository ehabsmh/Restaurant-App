import Sidebar from "./Sidebar";
import { useItemInfo } from "../contexts/ItemInfoContext";
import Items from "../components/Items";
import ItemDetails from "../components/ItemDetails";

function AppLayout() {
  const { activeItem } = useItemInfo();
  return (
    <>
      <Sidebar />

      {/* <Navbar /> */}
      <Items />
      {activeItem && <ItemDetails />}
    </>
  );
}

export default AppLayout;
