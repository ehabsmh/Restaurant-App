import { FormEvent, useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/apiProfiles";
import useAuth from "../hooks/useAuth";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";

type CheckoutDetailsProps = {
  setUserHasInfo: React.Dispatch<React.SetStateAction<boolean>>;
  userHasInfo: boolean;
};

function CheckoutDetails({
  setUserHasInfo,
  userHasInfo,
}: CheckoutDetailsProps) {
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userInfo, setUserInfo] = useState<{
    address: string;
    phoneNumber: string;
  }>({
    address: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function saveUserInfo(e: FormEvent) {
    e.preventDefault();

    if (!userAddress) return setValidationMsg("Address is required");
    if (!userPhone) return setValidationMsg("Phone Number is required");

    setIsLoading(true);

    const userInfo = {
      address: userAddress,
      phoneNumber: userPhone,
    };

    if (!currentUser) return;

    await updateUserProfile(currentUser?.id, userInfo);

    setIsLoading(false);
    setUserHasInfo(true);
  }

  useEffect(
    function () {
      async function getProfile() {
        if (!currentUser) return;
        setIsLoading(true);
        const userProfile = await getUserProfile(currentUser?.id);

        if (!userProfile) return navigate("/settings");

        if (userProfile) {
          const { address, phone_number: phoneNumber } = userProfile;

          setUserInfo({ address, phoneNumber });
          setUserAddress(address ?? "");
          setUserPhone(phoneNumber ?? "");
        }
        setIsLoading(false);
      }

      getProfile();
    },
    [currentUser, navigate],
  );

  useEffect(
    function () {
      if (!userAddress && !userPhone) {
        setValidationMsg(
          "Please provide us your address and phone number to deliver your order",
        );
      } else if (!userAddress && userPhone) {
        setValidationMsg(
          "Please provide us your address to deliver your order",
        );
      } else if (userAddress && !userPhone) {
        setValidationMsg(
          "Please provide us your phone number to deliver your order",
        );
      } else {
        setValidationMsg("");
      }
    },
    [userAddress, userPhone],
  );

  if (userHasInfo) return null;

  return (
    <>
      <p className="mt-10 text-sm text-red-600/70">{validationMsg}</p>
      <form className="mt-5" onSubmit={saveUserInfo}>
        {!userInfo.address && (
          <>
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
          </>
        )}
        {!userInfo.phoneNumber && (
          <>
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
          </>
        )}
        <button className="bg-body! p-0! w-24! h-14! mb-10 rounded-md text-sm">
          {isLoading ? <Loader color="#ed4b74" size={15} /> : "Save"}
        </button>
      </form>
    </>
  );
}

export default CheckoutDetails;
