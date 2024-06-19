import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import PostCard from "../Components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");

    setSidebarData({
      searchTerm: searchTermFromUrl || "",
      sort: sortFromUrl || "desc",
    });

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/post/getPosts?${urlParams.toString()}&category=event`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", numberOfPosts);
    try {
      const res = await fetch(
        `/api/post/getPosts?${urlParams.toString()}&category=event`
      );
      if (!res.ok) throw new Error("Failed to fetch more posts");
      const data = await res.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setShowMore(data.posts.length === 9);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="p-7 md: bg-gradient-to-r from-[#4d408e] to-[#150847] rounded-none md:w-1/4 lg:w-1/4">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center gap-2 w-full">
            <label className="text-white whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full">
            <label className="text-white whitespace-nowrap font-semibold">
              Sort:{" "}
            </label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              className="w-full"
              id="sort"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="flex-1  w-full">
        <h1 className="text-3xl font-semibold p-3 mt-5 text-center">
          Search results:
        </h1>
        <div className="p-4 flex flex-wrap gap-4 justify-evenly">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="w-full">
              <Loading />
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
