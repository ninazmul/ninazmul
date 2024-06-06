import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "https://i.ibb.co/8sdV5Z2/5001423-52522.jpg",
    },
    category: {
        type: String, 
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
