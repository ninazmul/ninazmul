import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function PostCard({ post }) {
  const isVideo =
    post.file &&
    (post.file.endsWith(".mp4") ||
      post.file.endsWith(".mov") ||
      post.file.endsWith(".webm"));

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-96 overflow-hidden rounded-lg sm:w-80 transition-all">
      <Link to={`/post/${post.slug}`}>
        {isVideo ? (
          <div className="relative h-[260px] w-full group-hover:h-[200px] transition-all duration-300 z-20">
            <ReactPlayer
              url={post.file}
              width="100%"
              height="100%"
              controls
              className="absolute top-0 left-0"
            />
          </div>
        ) : (
          <img
            src={post.file}
            alt="post cover"
            className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          />
        )}
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <p className="italic text-sm">{post.category}</p>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-2 absolute bottom-[-200px] w-[calc(100%-1rem)] left-1/2 transform -translate-x-1/2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none font-semibold"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}
