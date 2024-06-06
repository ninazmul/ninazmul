import { Button } from "flowbite-react";
import banner from "../../public/callbanner.webp";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row items-center p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl m-4">
      <div className="p-7 md:w-1/2 flex flex-col gap-3">
        <h2 className="text-3xl font-serif font-semibold">
          Become Our Volunteer!
        </h2>
        <p className="text-sm text-justify ">
          Make a difference in your community by joining us. Help those in need,
          gain experience, and meet like-minded people. Everyone is welcome!
        </p>
        <Link to={"/dashboard?tab=profile"}>
          <Button
            gradientDuoTone="greenToBlue"
            className="text-xl font-semibold w-full rounded-bl-none"
          >
            Become a Volunteer
          </Button>
        </Link>
      </div>
      <div className="p-7 flex-1">
        <img src={banner} className="rounded-lg" />
      </div>
    </div>
  );
}
