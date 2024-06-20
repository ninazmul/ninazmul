import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";

const Projects = () => {
  const [posts, setPosts] = useState([]);
  const [subCategory, setSubCategory] = useState("all");

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

  const handleSubCategoryChange = (subCategory) => {
    setSubCategory(subCategory);
  };

  const filteredPosts =
    subCategory === "all"
      ? posts
      : posts.filter((post) => post.subCategory === subCategory);

  return (
    <div className="min-h-screen m-4">
      <h1 className="text-3xl lg:text-5xl font-semibold font-mono text-center py-8">
        All Projects:
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className={`border px-4 py-2 rounded-md ${
            subCategory === "all"
              ? "bg-teal-200 text-purple-900 font-semibold"
              : ""
          }`}
          onClick={() => handleSubCategoryChange("all")}
        >
          All
        </button>
        <button
          className={`border px-4 py-2 rounded-md ${
            subCategory === "programming"
              ? "bg-teal-200 text-purple-900 font-semibold"
              : ""
          }`}
          onClick={() => handleSubCategoryChange("programming")}
        >
          Programming
        </button>
        <button
          className={`border px-4 py-2 rounded-md ${
            subCategory === "voice"
              ? "bg-teal-200 text-purple-900 font-semibold"
              : ""
          }`}
          onClick={() => handleSubCategoryChange("voice")}
        >
          Voice-Over
        </button>
        <button
          className={`border px-4 py-2 rounded-md ${
            subCategory === "graphics"
              ? "bg-teal-200 text-purple-900 font-semibold"
              : ""
          }`}
          onClick={() => handleSubCategoryChange("graphics")}
        >
          Graphics Design
        </button>
        {/* Add more buttons for other sub-categories as needed */}
      </div>

      {/* Display filtered posts */}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
