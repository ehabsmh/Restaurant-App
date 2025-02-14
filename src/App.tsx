import { Route, Routes } from "react-router-dom";
import "./index.css";
import AppLayout from "./ui/AppLayout";
import ItemDetails from "./components/ItemDetails";
import { ItemInfoProvider } from "./contexts/ItemInfoContext";

function App() {
  return (
    <div
      id="container"
      className="bg-main h-[95vh] w-[90%] lg:grid lg:grid-cols-[auto_auto_auto] lg:gap-4"
    >
      <ItemInfoProvider>
        <Routes>
          <Route index element={<AppLayout />} />
          <Route path="/:slug" element={<ItemDetails />} />
        </Routes>
      </ItemInfoProvider>
    </div>
  );
}

export default App;
