import { useEffect, useState } from "react";
import CustomCarousel from "./CustomCarousel";
import logo from "../../public/Prafulla-ai.png";

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
      image: logo,
      title: "Welcome to Prafulla",
      content: "May the world Winsome, Joyful and Blooming!",
    },
  ];

  return (
    <div>
      <CustomCarousel items={posts.length > 0 ? posts : defaultBanner} />
    </div>
  );
}
