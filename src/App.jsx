import { useState } from "react";
import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";

export default function App() {
  const [comments, setComments] = useState([]);

  function handleAddComment(content) {
    const newComment = {
      id: Date.now(),
      content,
      score: 0,
      username: data.currentUser.username,
      avatar: data.currentUser.image.png,
    };

    // Add it to your React state
    setComments((prevComments) => [...prevComments, newComment]);
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
