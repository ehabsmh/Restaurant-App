import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

type RegisterFormProps = {
  getUserInputs: (e: ChangeEvent<HTMLInputElement>) => void;
  register: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

function RegisterForm({ getUserInputs, register }: RegisterFormProps) {
  return (
    <div className="limiter h-[90vh]">
      <ToastContainer />
      <div className="container-login100 overflow-auto">
        <div className="wrap-login100 flex flex-col justify-center overflow-auto p-8">
          <form
            onSubmit={register}
            className="login100-form validate-form flex-sb flex-w"
          >
            <div className="p-t-31 p-b-9">
              <span className="txt1">First Name</span>
            </div>
            <div
              className="wrap-input100 validate-input mb-5"
              data-validate="First name is required"
            >
              <input
                onChange={getUserInputs}
                className="input100"
                type="text"
                name="firstName"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="p-t-31 p-b-9">
              <span className="txt1">Last Name</span>
            </div>
            <div
              className="wrap-input100 validate-input mb-5"
              data-validate="Last name is required"
            >
              <input
                onChange={getUserInputs}
                className="input100"
                type="text"
                name="lastName"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="p-t-31 p-b-9">
              <span className="txt1">Email Address</span>
            </div>
            <div
              className="wrap-input100 validate-input mb-5"
              data-validate="Email is required"
            >
              <input
                onChange={getUserInputs}
                className="input100"
                type="email"
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
                onChange={getUserInputs}
                className="input100"
                type="password"
                name="password"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="p-t-13 p-b-9">
              <span className="txt1">Address</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Address is required"
            >
              <input
                onChange={getUserInputs}
                className="input100"
                type="text"
                name="address"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn m-t-17">
              <button className="login100-form-btn mt-8">Register</button>
            </div>

            <div className="p-t-55 w-full text-center">
              <span className="txt2">Already have an account?</span>

              <Link to="/login" className="txt2 bo1 ml-2">
                Sign in now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
