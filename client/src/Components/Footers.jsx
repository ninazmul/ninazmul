import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import prafulla from "../../public/N.I. Logo croped.png";
import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <Footer
      container
      className="bg-gradient-to-r from-[#4d408e] to-[#150847] text-white dark:text-green-200 rounded-t-lg rounded-b-none"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <Link to="/">
            <img src={prafulla} alt="Prafulla Logo" className="w-64 py-4" />
          </Link>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title
                title="Website"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/about">About Me</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Follow us"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Link to="https://www.facebook.com/Prafulla.bd" target="_blank">
                  Facebook
                </Link>
                <Link
                  to="https://www.instagram.com/prafulla_bd"
                  target="_blank"
                >
                  Instagram
                </Link>
                <Link to="https://x.com/Prafulla_BD" target="_blank">
                  X
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Legal"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Link to="/privacyPolicy">Privacy Policy</Link>
                <Link to="/termsAndConditions">Terms &amp; Conditions</Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <p>
            Copyright © 2025 - All right reserved by{" "}
            <Link to="/">N.I. Nazmul</Link>
          </p>{" "}
          <p className="flex items-center gap-2">
            Developed by -{" "}
            <Link
              to="https://artistycode-studio.web.app"
              target="_blank"
              className="underline"
            >
              {/* <img src={acs} alt="" className="w-12" /> */} ArtistyCode
              Studio
            </Link>
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
