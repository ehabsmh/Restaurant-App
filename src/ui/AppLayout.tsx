import Sidebar from "./Sidebar";
import { ItemInfoProvider } from "../contexts/ItemInfoContext";
import Items from "../components/Items";

function AppLayout() {
  return (
    <>
      <ItemInfoProvider>
        <Sidebar />

        {/* <Navbar /> */}
        <Items />
        {/* <Order /> */}
      </ItemInfoProvider>
    </>
  );
}

export default AppLayout;
