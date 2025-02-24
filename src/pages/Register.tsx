import { ChangeEvent, FormEvent, useState } from "react";
import supabase from "../services/supabase";
import RegisterForm from "./RegisterForm";
import { toast } from "react-toastify";
import { createUserProfile } from "../services/apiProfiles";

export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

function Register() {
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  function getUserInputs(e: ChangeEvent<HTMLInputElement>) {
    const userCpy = { ...user };
    userCpy[e.target.name as keyof IUser] = e.target.value;
    setUser(userCpy);
  }

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });
      if (error) throw new Error(error.message);
      console.log(data);
      if (data.user) {
        await createUserProfile(data.user.id, user);
        toast.success(
          "Account successfully created! Please verify your account from your email address.",
        );
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
  return <RegisterForm getUserInputs={getUserInputs} register={register} />;
}

export default Register;
