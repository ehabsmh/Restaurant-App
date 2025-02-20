import "../styles/login.css";
import LoginForm from "./LoginForm";
import supabase from "../services/supabase";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "./Register";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/apiAuth";
import { getUserCartByUserId } from "../services/apiCart";
import useAuth from "../hooks/useAuth";
function Login() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleCurrentUser, handleUserCartId } = useAuth();

  function handleFormData(e: ChangeEvent<HTMLInputElement>) {
    const userCpy = { ...user };

    userCpy[e.target.name as keyof IUser] = e.target.value;
    setUser(userCpy);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user.email || !user.password) setError("Missing email or password");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw new Error("Incorrect email or password");
      console.log(data);

      setError("");

      const currentUser = await getCurrentUser();

      if (currentUser) {
        const userCart = await getUserCartByUserId(currentUser.id);

        handleUserCartId(userCart.id);
        handleCurrentUser(currentUser);
      }

      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }

  return (
    <LoginForm login={login} error={error} handleFormData={handleFormData} />
  );
}

export default Login;
