import { Link } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import Banner from "../Components/Banner";
import Committee from "../Components/Committee";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        // Filter posts to show only those in the "event" category
        const eventPosts = data.posts.filter(
          (post) => post.category === "event"
        );
        // Limit to the first 9 posts
        setPosts(eventPosts.slice(0, 9));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="">
        <Banner />
        {/* <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto z-10 top-0 text-white">
          
          <Button
            onClick={() => setOpenModal(true)}
            outline
            gradientDuoTone="greenToBlue"
            className="font-semibold"
          >
            Donation
          </Button>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header>Support Our Cause</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Dear Friend, We're so glad you've taken a step to make a
                  difference! Your generous donation will help us continue our
                  work and make a significant impact in the lives of those we
                  serve.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Thank you for your generosity and support!
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)} color="failure">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div> */}
      </div>
      <Committee />
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl lg:text-3xl font-semibold font-serif text-center pb-4">
              Recent Event Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
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
