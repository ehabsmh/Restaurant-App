import "../styles/login.css";
import LoginForm from "./LoginForm";
import supabase from "../services/supabase";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "./Register";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/AuthContext";
import { getCurrentUser } from "../services/apiAuth";
import { getUserCart } from "../services/apiCart";
import { useAppDispatch } from "../hooks/hooks";
import { addCart } from "../features/cart/CartSlice";
function Login() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { handleCurrentUser } = useSession();

  function handleFormData(e: ChangeEvent<HTMLInputElement>) {
    const userCpy = { ...user };

    userCpy[e.target.name as keyof IUser] = e.target.value;
    setUser(userCpy);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user.email || !user.password) setError("Missing email or password");
    try {
      console.log(user);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw new Error("Incorrect email or password");
      console.log(data);
      setError("");
      const currentUser = await getCurrentUser();
      const userCart = await getUserCart(currentUser?.id);
      console.log(userCart);

      dispatch(addCart({ id: userCart.id, userId: currentUser?.id }));

      handleCurrentUser(currentUser);
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
