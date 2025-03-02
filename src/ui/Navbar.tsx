import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { GrLogout, GrUserSettings } from "react-icons/gr";
import { logout } from "../services/apiAuth";

function Navbar() {
  const { isAuthenticated, handleCurrentUser } = useAuth();

  return (
    <div className="flex w-full items-center justify-between bg-white p-3 lg:max-h-[10vh]">
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
        <div className="flex items-center gap-5 lg:gap-14">
          <div className="group flex cursor-pointer flex-col items-center justify-center text-sm">
            <Link
              to="/cart"
              className="group-hover:text-gradient-2 text-gradient-1 text-[0.9rem] duration-300"
            >
              <BiCart className="text-gradient-1 group-hover:text-gradient-2 text-[0.9rem] duration-300 lg:text-[1.3rem]" />
              Cart
            </Link>
          </div>

          <Link
            to="/settings"
            className="hover:text-gradient-2 group flex cursor-pointer flex-col items-center justify-center text-[0.9rem] text-sm duration-300"
          >
            <GrUserSettings className="group-hover:text-gradient-2 text-[0.9rem] duration-300 lg:text-[1.3rem]" />
            Settings
          </Link>

          <Link
            to="/"
            onClick={async () => {
              await logout();
              handleCurrentUser(null);
            }}
            className="hover:text-gradient-2 group flex cursor-pointer flex-col items-center justify-center text-[0.9rem] text-sm duration-300"
          >
            <GrLogout className="group-hover:text-gradient-2 text-[0.9rem] duration-300 lg:text-[1.3rem]" />
            logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
