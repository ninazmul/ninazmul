import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        setFormData(data.posts[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpload = async () => {
    try {
      if (!file) {
        setUploadError("Please, select a file!");
        return;
      }
      setUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError("File upload failed!");
          setUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadProgress(null);
            setUploadError(null);
            setFormData({ ...formData, file: downloadURL });
          });
        }
      );
    } catch (error) {
      setUploadError("File upload failed!");
      setUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        subCategory: formData.subCategory,
        file: formData.file,
        github: formData.github,
        live: formData.live,
      };
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong!!!");
    }
  };

  const isVideo = file && file.type.startsWith("video");

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update this Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="project">Project</option>
            <option value="blog">Blog</option>
            <option value="banner">Banner</option>
          </Select>
          <Select
            value={formData.subCategory}
            onChange={(e) =>
              setFormData({ ...formData, subCategory: e.target.value })
            }
          >
            <option value="unsubcategorized">Select a Sub-Category</option>
            <option value="programming">Programming</option>
            <option value="voice">Voice</option>
            <option value="graphics">Graphics</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-green-700 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            gradientDuoTone="greenToBlue"
            type="button"
            size="sm"
            outline
            onClick={handleUpload}
            disabled={uploadProgress}
          >
            {uploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload File"
            )}
          </Button>
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        {formData.file &&
          (isVideo ? (
            <video controls className="w-full h-72 object-cover">
              <source src={formData.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={formData.file}
              alt="Uploaded file preview"
              className="w-full h-72 object-cover"
            />
          ))}
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="GitHub Link"
            id="github"
            value={formData.github}
            onChange={(e) =>
              setFormData({ ...formData, github: e.target.value })
            }
          />
          <TextInput
            type="text"
            placeholder="Live Link"
            id="live"
            value={formData.live}
            onChange={(e) => setFormData({ ...formData, live: e.target.value })}
          />
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />
        <Button gradientDuoTone="greenToBlue" type="submit">
          Update
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
