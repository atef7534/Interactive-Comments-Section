import { getAvatar } from "../utils/images";

export default function AddComment({ currentUser }) {
  console.log(currentUser.image.png);
  return (
    <div className="add-comment">
      <img src={getAvatar(currentUser.image.png)} alt="A user profile photo." />
      <form className="add-comment-form">
        <textarea placeholder="Add a comment..."></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
