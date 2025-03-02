import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="w-16">
      <img src="/assets/logo.png" />
    </Link>
  );
}

export default Logo;
