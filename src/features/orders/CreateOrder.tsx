import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { addOrderItems, createOrder } from "../../services/apiOrders";
import { ICart, ICartItem } from "../cart/Cart";
import { getUserProfile } from "../../services/apiProfiles";
import CheckoutDetails from "../../components/CheckoutDetails";
import { useEffect, useState } from "react";

type CreateOrderProps = {
  cart: ICart | null;
  setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
};

function CreateOrder({ cart, setCart, setCartItems }: CreateOrderProps) {
  const { currentUser, userCartId } = useAuth();
  const [userHasInfo, setUserHasInfo] = useState(true);

  async function order() {
    try {
      if (currentUser && userCartId) {
        const { id: orderId } = await createOrder(currentUser.id);

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

  useEffect(function () {
    async function checkUserInfo() {
      // Check if the user already has a profile (address and phoneNumber)
      const profile = await getUserProfile(currentUser?.id);
      console.log(profile);

      if (!profile?.address || !profile?.phone_number) {
        setUserHasInfo(false);
      }
    }

    checkUserInfo();
  }, []);

  return (
    <>
      <div className="flex justify-center gap-5">
        <div className="h-full w-px bg-gray-300"></div>
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-secondary text-2xl font-medium">Total</h4>
            <p className="text-gradient-1 text-lg font-bold">
              ${cart?.total_price}
            </p>
          </div>

          {!userHasInfo && (
            <CheckoutDetails
              setUserHasInfo={setUserHasInfo}
              userHasInfo={userHasInfo}
            />
          )}
          {userHasInfo && (
            <div className="flex justify-center">
              <button
                className="btn-google w-56! mt-7 font-bold"
                onClick={order}
              >
                Create Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
