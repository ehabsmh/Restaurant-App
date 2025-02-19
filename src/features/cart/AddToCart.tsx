import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../contexts/AuthContext";

type AddToCartProps = {
  addToCart: () => void;
  setItemInCart: React.Dispatch<React.SetStateAction<boolean>>;
};
function AddToCart({ addToCart, setItemInCart }: AddToCartProps) {
  const { currentUser } = useAuth(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="">
      <p className="text-sm">Add to cart</p>
      <BiCartAdd
        onClick={() => {
          if (!currentUser) navigate("/login");
          addToCart();
          setItemInCart(true);
        }}
        className="text-gradient-1 w-full cursor-pointer"
        size={30}
      />
    </div>
  );
}

export default AddToCart;
