import { Link } from "react-router-dom";
import { useSession } from "../contexts/AuthContext";
import { logout } from "../services/apiAuth";

function Navbar() {
  const { currentUser, handleCurrentUser } = useSession();

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
        <div>
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
