import "../styles/login.css";
import LoginForm from "./LoginForm";
import supabase from "../services/supabase";
import { ChangeEvent, useState } from "react";
import { IUser } from "./Register";
import { useNavigate } from "react-router-dom";
function Login() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleFormData(e: ChangeEvent<HTMLInputElement>) {
    const userCpy = { ...user };
    userCpy[e.target.name as keyof IUser] = e.target.value;
    setUser(userCpy);
  }

  async function login(e: SubmitEvent) {
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
