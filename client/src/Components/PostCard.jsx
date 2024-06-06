import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-96 overflow-hidden rounded-lg sm:w-80 transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <p className="italic text-sm">{post.category}</p>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-2 absolute bottom-[-200px] w-[calc(100%-1rem)] left-1/2 transform -translate-x-1/2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none font-semibold"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
