import "./index.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import { ItemInfoProvider } from "./contexts/ItemInfoContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./features/cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./components/Settings";

function App() {
  return (
    // <div id="container" className="bg-main h-[95vh] w-[90%]">
    <ItemInfoProvider>
      <Routes>
        <Route index element={<AppLayout />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ItemInfoProvider>
    // </div>
  );
}

export default App;
