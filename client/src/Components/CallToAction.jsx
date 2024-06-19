import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import lightLogo from "/public/N.I. Logo croped.png";
import darkLogo from "/public/N.I. Logo croped dark.webp";
import { IoLogoWhatsapp } from "react-icons/io";

export default function CallToAction() {
  const { theme } = useSelector((state) => state.theme);
  const logo = theme === "dark" ? lightLogo : darkLogo;
  const whatsappLink = "https://wa.me/+8801580845746";

  return (
    <div className="flex flex-col md:flex-row items-center p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl m-4">
      <div className="p-7 md:w-1/2 flex flex-col gap-3">
        <h2 className="text-3xl font-serif font-semibold">
          Contact Me via WhatsApp!
        </h2>
        <p className="text-sm text-justify">
          Have a project in mind or just want to say hi? Let's connect on
          WhatsApp and create something amazing together. I'm always open to new
          opportunities and collaborations. Feel free to reach out!
        </p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button
            gradientDuoTone="purpleToBlue"
            className="text-xl font-semibold w-full rounded-bl-none flex items-center justify-center gap-2"
          >
            <IoLogoWhatsapp size={20} className="mr-1" />
            WhatsApp Me
          </Button>
        </a>
      </div>
      <div className="p-7 flex-1">
        <img
          src={logo}
          alt="ninazmul"
          className={` ${theme === "dark" ? "dark-class" : "light-class"}`}
        />
      </div>
    </div>
  );
}
