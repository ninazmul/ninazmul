import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCard from "../Components/PostCard";
import Loading from "../Components/Loading";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await res.json();
        if (data.posts.length === 0) {
          throw new Error("Post not found");
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?category=project&limit=3`);
        if (!res.ok) {
          throw new Error("Failed to fetch recent posts");
        }
        const data = await res.json();
        setRecentPosts(data.posts);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) return <Loading />;

  if (error || !post) {
    return (
      <main className="p-3 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-4 font-serif">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg">Please try again later.</p>
      </main>
    );
  }

  const isVideo =
    post.file &&
    (post.file.endsWith(".mp4") ||
      post.file.endsWith(".mov") ||
      post.file.endsWith(".webm"));

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>
      <Link
        to={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>
      <div className="mt-10 w-full object-cover bg-gray-500">
        {isVideo ? (
          <iframe
            title={post.title}
            width="100%"
            height="100%"
            src={post.file}
            frameBorder="0"
            allowFullScreen
            style={{ objectFit: "cover" }}
          ></iframe>
        ) : (
          <img
            src={post.file}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex justify-between items-center p-4 border-b border-green-900 mx-auto w-full text-xs">
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </p>
      </div>
      <div
        className="p-3 mx-auto overflow-x-auto w-full post-content text-justify"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <div>
        <CommentSection postId={post._id} />
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-2xl lg:text-3xl font-semibold font-serif text-center pt-4">
          Recent Projects
        </h1>
        <div className="flex flex-wrap gap-4 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
