import data from "../../data.json";
import Comment from "./Comment";

export default function CommentsPerUser() {
  const allComments = data.comments.map(function (item, index) {
    return (
      <Comment
        comment={item}
        key={index}
        username={data.currentUser.username}
      />
    );
  });
  return allComments;
}
