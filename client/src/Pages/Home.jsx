import { Link } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import Banner from "../Components/Banner";
import MyServices from "../Components/MyServices";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        // Filter posts to show only those in the "project" category
        const eventPosts = data.posts.filter(
          (post) => post.category === "project"
        );
        // Limit to the first 9 posts
        setPosts(eventPosts.slice(0, 9));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const renderPostsByCategory = () => {
    // Initialize arrays for different categories
    let programmingPosts = [];
    let voicePosts = [];
    let graphicsPosts = [];

    // Categorize posts based on sub-category or other criteria
    posts.forEach((post) => {
      switch (post.subCategory) {
        case "programming":
          programmingPosts.push(post);
          break;
        case "voice":
          voicePosts.push(post);
          break;
        case "graphics":
          graphicsPosts.push(post);
          break;
        default:
          break;
      }
    });

    // Alternate rendering posts from different categories
    let renderedPosts = [];
    for (
      let i = 0;
      i <
      Math.max(
        programmingPosts.length,
        voicePosts.length,
        graphicsPosts.length
      );
      i++
    ) {
      if (programmingPosts[i]) {
        renderedPosts.push(programmingPosts[i]);
      }
      if (voicePosts[i]) {
        renderedPosts.push(voicePosts[i]);
      }
      if (graphicsPosts[i]) {
        renderedPosts.push(graphicsPosts[i]);
      }
    }

    return renderedPosts.map((post) => <PostCard key={post._id} post={post} />);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
      <Banner />
      <MyServices />

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl lg:text-5xl font-semibold font-mono text-center py-8">
              Recent Projects
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {renderPostsByCategory()}
            </div>
            {posts.length === 9 && (
              <Link
                to="/search"
                className="text-lg text-teal-500 hover:underline text-center"
              >
                View all posts
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
