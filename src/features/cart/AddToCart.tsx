import { BiCartAdd } from "react-icons/bi";
import { useSession } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AddToCart() {
  const { currentUser } = useSession();
  const navigate = useNavigate();
  return (
    <div className="">
      <p className="text-sm">Add to cart</p>
      <BiCartAdd
        onClick={() => {
          if (!currentUser) navigate("/login");
        }}
        className="text-gradient-1 w-full cursor-pointer"
        size={30}
      />
    </div>
  );
}

export default AddToCart;
