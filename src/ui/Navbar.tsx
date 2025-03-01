import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { GrLogout, GrUserSettings } from "react-icons/gr";

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex max-h-[10vh] w-full items-center justify-between bg-white p-3">
      <div>
        <Link to="/" className="text-secondary text-2xl font-bold">
          Foods
        </Link>
        <p className="text-sm">Cak Benu Food & Beverages</p>
      </div>

      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex items-center gap-14">
          <div className="group flex cursor-pointer flex-col items-center justify-center text-sm">
            <Link
              to="/cart"
              className="group-hover:text-gradient-2 text-gradient-1 duration-300"
            >
              <BiCart
                size={20}
                className="text-gradient-1 group-hover:text-gradient-2 duration-300"
              />
              Cart
            </Link>
          </div>

          <Link
            to="/settings"
            className="hover:text-gradient-2 group flex cursor-pointer flex-col items-center justify-center text-sm duration-300"
          >
            <GrUserSettings
              size={20}
              className="group-hover:text-gradient-2 duration-300"
            />
            Settings
          </Link>

          <Link
            to="/login"
            className="hover:text-gradient-2 group flex cursor-pointer flex-col items-center justify-center text-sm duration-300"
          >
            <GrLogout
              size={20}
              className="group-hover:text-gradient-2 duration-300"
            />
            logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
