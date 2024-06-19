import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

// Create a post
export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You're not allowed to create a post!"));
  }

  const { title, content, category, subCategory, github, live, file } =
    req.body;

  if (!title || !content) {
    return next(errorHandler(400, "Please provide all required fields!"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    title,
    content,
    category,
    subCategory,
    github,
    live,
    file,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Get posts
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPost = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPost,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a post
export const deletepost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }

    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, "You're not allowed to delete this post!"));
    }

    await post.remove();
    res.status(200).json("The post has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Update a post
export const updatepost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }

    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, "You're not allowed to update this post!"));
    }

    const updates = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      subCategory: req.body.subCategory,
      github: req.body.github,
      live: req.body.live,
      file: req.body.file,
    };

    for (const key in updates) {
      if (updates[key] !== undefined) {
        post[key] = updates[key];
      }
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
