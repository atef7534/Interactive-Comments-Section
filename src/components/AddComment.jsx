import { useState } from "react";
import { getAvatar } from "../utils/images";

export default function AddComment({ currentUser, onAddComment }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    const wasAdded = await onAddComment(trimmedContent);

    if (wasAdded) {
      setContent("");
    }
  }

  return (
    <div className="add-comment">
      <img src={getAvatar(currentUser.image.png)} alt="A user profile photo." />

      <form className="add-comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="add-comment-area"
        ></textarea>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
