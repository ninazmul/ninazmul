import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";
import lightLogo from "/public/N.I. Logo croped.png";
import darkLogo from "/public/N.I. Logo croped dark.webp";

const Signin = () => {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields!"));
    }
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const logo = theme === "dark" ? lightLogo : darkLogo;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row-reverse gap-10 p-4">
        {/* left side  */}
        <div className="flex flex-col items-center md:w-1/2">
          <Link to="/">
            <img
              src={logo}
              alt="ninazmul"
              className={`h-928 sm:h-32 ${
                theme === "dark" ? "dark-class" : "light-class"
              }`}
            />
          </Link>
          <h1 className="text-4xl flex items-center font-bold font-mono ">
            Welcome Back!
          </h1>

          <p className="text-justify">
            Sign in to access your account and dive back into our community.
            Let's continue the journey together.
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 lg:p-10 bg-gradient-to-r from-[#4d408e] to-[#150847] rounded-lg"
          >
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-mono text-center">
              Sign In Now!
            </h1>
            <div>
              <Label value="Your email" className="text-white" />
              <TextInput
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label value="Your password" className="text-white" />
              <TextInput
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="text-xl font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div>
            <p className="text-center p-2 text-sm">
              If you're new here, you can{" "}
              <Link to="/sign-up" className="underline text-blue-700">
                Sign-Up
              </Link>{" "}
              for an account.
            </p>
          </div>
          {errorMessage && (
            <Alert className="" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
