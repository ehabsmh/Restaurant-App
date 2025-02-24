import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { addOrderItems, createOrder } from "../../services/apiOrders";
import { ICart, ICartItem } from "../cart/Cart";

type CreateOrderProps = {
  cart: ICart | null;
  setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

function CreateOrder({ cart, setCart, setCartItems }: CreateOrderProps) {
  const { currentUser, userCartId } = useAuth();

  async function order() {
    try {
      if (currentUser && userCartId) {
        const { id: orderId } = await createOrder(currentUser.id);
        console.log(orderId);

        await addOrderItems(userCartId, orderId);
        setCartItems([]);
        setCart(null);
        toast.success(
          "Order is submitted and will be delivered to you in a short time.",
        );
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="h-full w-px bg-gray-300"></div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-secondary text-2xl font-medium">Total</h4>
          <p className="text-gradient-1 text-lg font-bold">
            ${cart?.total_price}
          </p>
        </div>
        <button className="btn-google w-36! mt-7 font-bold" onClick={order}>
          Create Order
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
