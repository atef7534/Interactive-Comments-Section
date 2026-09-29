import { useState } from "react";
import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";

export default function App() {
  const [comments, setComments] = useState(data.comments);

  function handleDeleteComment(commentId) {
    setComments((previousComments) =>
      previousComments.filter((comment) => comment.id !== commentId),
    );
  }

  function handleAddComment(content) {
    const newComment = {
      id: Date.now(),
      content,
      createdAt: "just now",
      score: 0,
      user: {
        image: data.currentUser.image,
        username: data.currentUser.username,
      },
      replies: [],
    };

    setComments((prevComments) => {
      console.log([...prevComments, newComment]);
      return [...prevComments, newComment];
    });

    return true;
  }

  return (
    <>
      <CommentsPerUser
        comments={comments}
        username={data.currentUser.username}
        onDeleteComment={handleDeleteComment}
      />

      <AddComment
        currentUser={data.currentUser}
        onAddComment={handleAddComment}
      />
    </>
  );
}
