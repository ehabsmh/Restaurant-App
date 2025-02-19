import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/apiAuth";
import { BiCart } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { currentUser, handleCurrentUser } = useAuth(AuthContext);

  return (
    <div className="flex max-h-[10vh] w-full items-center justify-between bg-white p-3">
      <div>
        <h1 className="text-secondary text-2xl font-bold">Foods</h1>
        <p className="text-sm">Cak Benu Food & Beverages</p>
      </div>

      {!currentUser && (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}

      {currentUser && (
        <div className="flex items-center gap-14">
          <div>
            <Link to="/cart">
              <BiCart size={20} className="text-gradient-1" />
              Cart
            </Link>
          </div>
          <Link
            to="/login"
            onClick={() => {
              logout();
              handleCurrentUser(null);
            }}
          >
            logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
