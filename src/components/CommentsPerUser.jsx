import Comment from "./Comment";

export default function CommentsPerUser({ comments, username }) {
  return comments.map((comment) => (
    <Comment
      comment={comment}
      key={comment.id}
      username={username}
    />
  ));
}
