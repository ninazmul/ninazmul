import { Link, useNavigate } from "react-router-dom";
import prafulla from "../../public/N.I. Logo croped.png";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../Components/OAuth";
import lightLogo from "/public/N.I. Logo croped.png";
import darkLogo from "/public/N.I. Logo croped dark.webp";
import { useSelector } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields!");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const logo = theme === "dark" ? lightLogo : darkLogo;

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
        {/* left side  */}
        <div className="flex flex-col items-center">
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
            Join Us Today!
          </h1>

          <p className=" text-justify">
            Sign up now to connect, discover, and contribute to our community.
            It only takes a moment!
          </p>
        </div>
        {/* right side  */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 lg:p-10 bg-gradient-to-r from-[#4d408e] to-[#150847] rounded-lg"
          >
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-mono text-center">
              Sign-Up Now!
            </h1>
            <div>
              <Label value="Your username" className="text-white" />
              <TextInput
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div>
            <p className="text-center pt-2 text-sm">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline text-blue-700">
                Sign-In
              </Link>
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

export default Signup;
