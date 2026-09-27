import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import replyIcon from "../assets/icon-reply.svg";
import editIcon from "../assets/icon-edit.svg";
import deleteIcon from "../assets/icon-delete.svg";

export default function Reply({ reply, index, handleRepliesLike, userName }) {
  return (
    <div className="replies comment">
      <div className="col col-rate">
        <button
          className="btn-cnt"
          onClick={() => handleRepliesLike(index, 1)}
          disabled={reply.liked}
        >
          <img src={plusIcon} alt="A plus icon" />
        </button>

        <p className="likes">{reply.score}</p>

        <button
          className="btn-cnt"
          onClick={() => handleRepliesLike(index, -1)}
          disabled={!reply.liked}
        >
          <img src={minusIcon} alt="A minus icon" />
        </button>
      </div>

      <div className="col col-commenter">
        <div className="row">
          <img
            className="commenter-logo"
            src={reply.user.image.png}
            alt="A profile photo"
          />

          <h1 className="commenter-name">{reply.user.username}</h1>

          {reply.user.username === userName && <span className="you">You</span>}
          <p className="when-posted">{reply.createdAt}</p>

          <div className="edit-or-reply">
            {reply.user.username === userName && (
              <button className="delete-btn">
                <img src={deleteIcon} alt="A reply icon" />
                Delete
              </button>
            )}
            <button className="reply-btn">
              <img
                src={reply.user.username === userName ? editIcon : replyIcon}
                alt="A reply icon"
              />
              {reply.user.username === userName ? "Edit" : "Reply"}
            </button>
          </div>
        </div>

        <div className="row">
          <p className="comment-content">
            <span className="replying-to">@{reply.replyingTo} </span>
            {reply.content}
          </p>
        </div>
      </div>
    </div>
  );
}
