import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex max-h-[10vh] w-full items-center justify-between bg-white p-3">
      <div>
        <h1 className="text-secondary text-2xl font-bold">Foods</h1>
        <p className="text-sm">Cak Benu Food & Beverages</p>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
