/* eslint-disable react-refresh/only-export-components */
import { FormEvent, useEffect, useReducer, useState } from "react";
import {
  createUserProfile,
  getUserProfile,
  IUserInfo,
  updateUserProfile,
} from "../services/apiProfiles";
import useAuth from "../hooks/useAuth";
import Loader from "../ui/Loader";
import Navbar from "../ui/Navbar";

// type userInfoInitState = {
//   firstName?: string;
//   lastName?: string;
//   address?: string;
//   phoneNumber?: string;
// };

const initialState: IUserInfo = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
};

export enum ActionType {
  setUserInfo = "setUserInfo",
  changeFirstName = "changeFirstName",
  changeLastName = "changeLastName",
  changeAddress = "changeAddress",
  changePhoneNumber = "changePhoneNumber",
}

export interface Action {
  type: ActionType;
  payload: IUserInfo | string;
}

function reducer(state: IUserInfo, action: Action) {
  switch (action.type) {
    case ActionType.setUserInfo:
      return { ...state, ...(action.payload as IUserInfo) };

    case ActionType.changeFirstName:
      return { ...state, firstName: action.payload as string };

    case ActionType.changeLastName:
      return { ...state, lastName: action.payload as string };

    case ActionType.changeAddress:
      return { ...state, address: action.payload as string };

    case ActionType.changePhoneNumber:
      return { ...state, phoneNumber: action.payload as string };

    default:
      return state;
  }
}

function Settings() {
  const { currentUser } = useAuth();

  const [{ firstName, lastName, address, phoneNumber }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const [isLoading, setIsLoading] = useState(true);

  // userInfoCopy is needed to check if any of the user data has been changed
  const [userInfoCopy, setUserInfoCopy] = useState(initialState);

  // to disable/enable the save button.
  const [infoHasChanged, setInfoHasChanged] = useState(false);

  const [isNew, setIsNew] = useState(false);

  const [error, setError] = useState("");

  async function updateProfile(e: FormEvent) {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const userInfo = {
        firstName,
        lastName,
        address,
        phoneNumber,
      };
      // check if the user has profile
      const profile = await getUserProfile(currentUser.id);

      if (Object.values(userInfo).some((value) => !value)) {
        setError("Please provide us your info");
        setInfoHasChanged(false);
        return;
      }

      // if no profile, create new profile and insert the new info
      if (!profile) {
        await createUserProfile(currentUser.id, userInfo);
      }
      // if profile, update user profile.
      else await updateUserProfile(currentUser?.id, userInfo);

      setUserInfoCopy({ firstName, lastName, address, phoneNumber });
      setInfoHasChanged(false);
      setError("");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  useEffect(
    function () {
      async function getProfile() {
        if (!currentUser) return;

        const userProfile = await getUserProfile(currentUser?.id);

        if (!userProfile) setIsNew(true);

        if (userProfile) {
          const {
            address,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
          } = userProfile;

          dispatch({
            type: ActionType.setUserInfo,
            payload: {
              address: address ?? "",
              firstName: firstName ?? "",
              lastName: lastName ?? "",
              phoneNumber: phoneNumber ?? "",
            },
          });

          setUserInfoCopy({
            address: address ?? "",
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            phoneNumber: phoneNumber ?? "",
          });
        }

        setIsLoading(false);
      }

      getProfile();
    },
    [currentUser],
  );

  return (
    <>
      <Navbar />

      <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">
          {isNew ? "Create new profile" : "Settings"}
        </h2>

        {error && <p className="text-red-400">{error}</p>}

        <form className="space-y-4" onSubmit={updateProfile}>
          {/* First Name */}
          <div>
            <label className="text-secondary mb-1 block font-medium">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => {
                if (e.target.value !== userInfoCopy.firstName)
                  setInfoHasChanged(true);
                else setInfoHasChanged(false);

                dispatch({
                  type: ActionType.changeFirstName,
                  payload: e.target.value,
                });
              }}
              className="focus:ring-gradient-1 disabled:bg-main-inactive mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              disabled={isLoading}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-secondary mb-1 block font-medium">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                if (e.target.value !== userInfoCopy.lastName)
                  setInfoHasChanged(true);
                else setInfoHasChanged(false);

                dispatch({
                  type: ActionType.changeLastName,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your last name"
              className="focus:ring-gradient-1 disabled:bg-main-inactive mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              disabled={isLoading}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-secondary mb-1 block font-medium">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                if (e.target.value !== userInfoCopy.address)
                  setInfoHasChanged(true);
                else setInfoHasChanged(false);

                dispatch({
                  type: ActionType.changeAddress,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your address"
              className="focus:ring-gradient-1 disabled:bg-main-inactive mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              disabled={isLoading}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-secondary mb-1 block font-medium">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value !== userInfoCopy.phoneNumber)
                  setInfoHasChanged(true);
                else setInfoHasChanged(false);

                dispatch({
                  type: ActionType.changePhoneNumber,
                  payload: e.target.value,
                });
              }}
              placeholder="Enter your phone number"
              className="focus:ring-gradient-1 disabled:bg-main-inactive mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              disabled={isLoading}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`${isLoading || !infoHasChanged ? "cursor-default! bg-secondary/70!" : "bg-gradient-to-bl! from-gradient-1 to-gradient-2"} hover:bg-secondary mt-3 w-full rounded-lg py-2 font-semibold text-white transition duration-200`}
          >
            {isLoading ? <Loader size={15} color="#ffffff" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Settings;
