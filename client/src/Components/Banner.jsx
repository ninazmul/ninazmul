import { useEffect, useState } from "react";
import CustomCarousel from "./CustomCarousel";
import image from "/public/1694098009329.webp";

import { BsFacebook } from "react-icons/bs";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { TbBrandFiverr } from "react-icons/tb";
import { SiUpwork } from "react-icons/si";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Banner() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        const bannerPosts = data.posts.filter(
          (post) => post.category === "banner"
        );
        setPosts(bannerPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const defaultBanner = [
    {
      file: image,
      title: "Default Banner",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center m-4 md:m-10 gap-4 lg:gap-10">
      <div className="p-4 lg:p-10 flex flex-col justify-start">
        <h3 className="text-2xl font-semibold">{"I'm N.I. Nazmul"}</h3>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-normal uppercase font-mono py-4">
          Artist <span className="">& </span>Programmer
        </h1>
        <p className="lg:text-xl flex gap-2">
          Versatile artist with skills in{" "}
          <span className=" font-bold">
            <Typewriter
              options={{
                strings: ["", "Programming", "Graphics", "Voice"],
                autoStart: true,
                loop: true,
              }}
            />{" "}
          </span>
        </p>
        <div className="flex justify-center items-center space-x-2 py-4">
          <Link
            to="https://www.facebook.com/nazmulsaw"
            target="_blank"
            className="hover:text-teal-400 rounded-full glow p-2"
          >
            <BsFacebook className="text-[28px]" />
          </Link>
          <Link
            to="https://github.com/ninazmul"
            target="_blank"
            className="hover:text-teal-400 rounded-full glow p-2"
          >
            <AiFillGithub className="text-[28px]" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/ninazmul"
            target="_blank"
            className="hover:text-teal-400 rounded-full glow p-2"
          >
            <AiFillLinkedin className="text-[28px] rounded-full" />
          </Link>
          <Link
            to="https://www.fiverr.com/ninazmul"
            target="_blank"
            className="hover:text-teal-400 rounded-full glow p-2"
          >
            <TbBrandFiverr className="text-[28px] rounded-full" />
          </Link>
          <Link
            to="https://www.upwork.com/freelancers/~01369d0d10ed1780e4"
            target="_blank"
            className="hover:text-teal-400 rounded-full glow p-2"
          >
            <SiUpwork className="text-[28px] rounded-full" />
          </Link>
        </div>
      </div>
      <div className="">
        <CustomCarousel items={posts.length > 0 ? posts : defaultBanner} />
      </div>
    </div>
  );
}
