import { useEffect, useState } from "react";
import { createUserProfile } from "../services/apiProfiles";
import useAuth from "../hooks/useAuth";
import Loader from "../ui/Loader";

function CheckoutDetails({ setUserHasInfo }) {
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  async function saveUserInfo(e: FormDataEvent) {
    setIsLoading(true);
    e.preventDefault();

    const userInfo = {
      address: userAddress,
      phone: userPhone,
    };

    await createUserProfile(currentUser?.id, userInfo);
    setIsLoading(false);
    setUserHasInfo(true);
  }

  return (
    <>
      <p className="mt-10 text-sm text-red-600/70">
        Please provide us your address and phone number to deliver your order
      </p>
      <form className="mt-5" onSubmit={saveUserInfo}>
        <div className="p-t-31 p-b-9">
          <span className="txt1">Address</span>
        </div>
        <div
          className="wrap-input100 validate-input mb-5"
          data-validate="Address is required"
        >
          <input
            className="input100"
            type="text"
            name="address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <span className="focus-input100"></span>
        </div>
        <div className="p-t-31 p-b-9">
          <span className="txt1">Phone Number</span>
        </div>
        <div
          className="wrap-input100 validate-input mb-5"
          data-validate="phone number is required"
        >
          <input
            className="input100"
            type="text"
            name="phoneNumber"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <span className="focus-input100"></span>
        </div>
        <button className="bg-body! p-0! w-24! h-14! mb-10 rounded-md text-sm">
          {isLoading ? <Loader color="#ed4b74" size={15} /> : "Save"}
        </button>
      </form>
    </>
  );
}

export default CheckoutDetails;
