import { useState } from "react";
import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";

export default function App() {
  const [comments, setComments] = useState(data.comments);

  function handleAddComment(content) {
    const newComment = {
      id: Date.now(),
      content,
      createdAt: "just now",
      score: 0,
      user: data.currentUser,
      replies: [],
    };

    setComments((prevComments) => [...prevComments, newComment]);

    return true;
  }

  return (
    <>
      <CommentsPerUser
        comments={comments}
        username={data.currentUser.username}
      />

      <AddComment
        currentUser={data.currentUser}
        onAddComment={handleAddComment}
      />
    </>
  );
}
