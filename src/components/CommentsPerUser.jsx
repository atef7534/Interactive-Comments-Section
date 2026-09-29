import Comment from "./Comment";

export default function CommentsPerUser({ comments, username, onDeleteComment }) {
  return comments.map((comment) => (
    <Comment
      comment={comment}
      key={comment.id}
      username={username}
      onDeleteComment={onDeleteComment}
    />
  ));
}
