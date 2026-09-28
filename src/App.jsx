import { useState } from "react";
import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";

export default function App() {
  const [comments, setComments] = useState(data.comments);

  function handleAddComment(comment) {
    setComments((prevComments) => [...prevComments, comment]);
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
