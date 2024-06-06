import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState(null);
    const [commentsError, setCommentsError] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 200) {
        return;
      }
      try {
        const res = await fetch("/api/comment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setComment("");
          setCommentError(null);
          setComments([data, ...comments]);
        }
      } catch (error) {
        setCommentError(error.message);
      }
    };
  
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        setCommentsError(error.message)
      }  
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in")
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map((comment) =>
          comment._id === commentId ? {
            ...comment,
            likes: data.likes,
            numberOfLikes: data.likes.length
          } : comment
        ))
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (res.ok) {
        const updatedComment = await res.json();
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === comment._id
              ? { ...c, content: updatedComment.content }
              : c
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 mx-auto w-full">
      {currentUser ? (
        <>
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img
              src={currentUser.profilePicture}
              alt="user"
              className="w-5 h-5 object-cover rounded-full"
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-xs text-cyan-500 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="text-sm text-teal-500 my-5 flex gap-1">
            You must be signed in to comment.
            <Link to={"/sign-in"} className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </>
      )}
      {currentUser && (
        <>
          <form
            onSubmit={handleSubmit}
            className="border border-teal-500 rounded-md p-3"
          >
            <TextInput
              placeholder="Add a comment..."
              rows="3"
              maxLength="200"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-500 text-xs">
                {200 - comment.length} characters remaining
              </p>
              <Button
                outline
                gradientDuoTone="greenToBlue"
                type="submit"
                className="text-xl font-semibold"
              >
                Submit
              </Button>
            </div>
            {commentError && (
              <Alert color="failure" className="mt-5">
                {commentError}
              </Alert>
            )}
          </form>
        </>
      )}
      {comments.length === 0 ? (
        <>
          <p className="text-sm my-5">No comments yet!</p>
        </>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p className="font-semibold">Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p className="font-semibold">{comments.length}</p>
            </div>
          </div>
          <div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          </div>
        </>
      )}
      {commentsError && (
        <Alert color="failure" className="mt-5">
          {commentsError}
        </Alert>
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=> handleDelete(commentToDelete)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
