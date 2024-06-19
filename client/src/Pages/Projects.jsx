import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";

const Projects = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        const bannerProject = data.posts.filter(
          (post) => post.category === "project"
        );
        setPosts(bannerProject);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen m-4">
      <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
        All Projects:
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
