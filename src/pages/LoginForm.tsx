import { FaGoogle } from "react-icons/fa";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent } from "react";
import { googleOAuthLogin } from "../services/apiAuth";
type LoginFormProps = {
  login: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
  handleFormData: (e: ChangeEvent<HTMLInputElement>) => void;
};
function LoginForm({ login, error, handleFormData }: LoginFormProps) {
  return (
    <div className="limiter h-[90vh]">
      <div className="container-login100">
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33 flex items-center justify-center p-16">
          <form onSubmit={login} className="login100-form validate-form">
            {error && <p className="mb-10 text-center text-red-500">{error}</p>}
            <span className="login100-form-title p-b-53">Sign In With</span>
            <div
              onClick={googleOAuthLogin}
              className="btn-google mx-auto mb-10 flex cursor-pointer justify-center"
            >
              <FaGoogle />
            </div>

            <div className="p-t-31 p-b-9">
              <span className="txt1">Email Address</span>
            </div>
            <div
              className="wrap-input100 validate-input mb-5"
              data-validate="Email is required"
            >
              <input
                onChange={handleFormData}
                className="input100"
                type="text"
                name="email"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="p-t-13 p-b-9">
              <span className="txt1">Password</span>

              <a href="#" className="txt2 bo1 m-l-5 ml-2">
                Forgot?
              </a>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                onChange={handleFormData}
                className="input100"
                type="password"
                name="password"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn m-t-17">
              <button className="login100-form-btn mt-8">Sign In</button>
            </div>

            <div className="p-t-55 w-full text-center">
              <span className="txt2">Not a member?</span>

              <Link to="/register" className="txt2 bo1 ml-2">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
