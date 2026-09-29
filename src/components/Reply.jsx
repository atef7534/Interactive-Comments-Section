import { useState } from "react";
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import replyIcon from "../assets/icon-reply.svg";
import editIcon from "../assets/icon-edit.svg";
import deleteIcon from "../assets/icon-delete.svg";
import { getAvatar } from "../utils/images";
import data from "../../data.json";

export default function Reply({
  reply: currentReply,
  index: replyIndex,
  handleRepliesLike,
  userName: currentUserName,
  setAllReplies: setReplies,
}) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const isCurrentUserReply = currentReply.user.username === currentUserName;

  function handleAddReply() {
    if (!replyContent.trim()) return;

    const replyToAdd = {
      id: Date.now(),
      content: replyContent,
      score: 0,
      replyingTo: currentReply.user.username,
      createdAt: "just now",
      user: {
        image: data.currentUser.image,
        username: data.currentUser.username,
        added: false,
      },
    };

    setReplies((previousReplies) => {
      const updatedReplies = [...previousReplies];

      updatedReplies.splice(replyIndex + 1, 0, replyToAdd);

      return updatedReplies;
    });

    setReplyContent("");
    setIsReplyFormOpen(false);
  }

  function handleDeleteReply() {
    setReplies((previousReplies) =>
      previousReplies.filter((_, index) => index !== replyIndex),
    );
  }

  function handleReplyAction() {
    if (!isCurrentUserReply) {
      setIsReplyFormOpen(true);
    }
  }

  return (
    <>
      <div className="replies comment">
        <div className="col col-rate">
          <button
            className="btn-cnt"
            onClick={() => handleRepliesLike(replyIndex, 1)}
            disabled={currentReply.liked}
          >
            <img src={plusIcon} alt="A plus icon" />
          </button>

          <p className="likes">{currentReply.score}</p>

          <button
            className="btn-cnt"
            onClick={() => handleRepliesLike(replyIndex, -1)}
            disabled={!currentReply.liked}
          >
            <img src={minusIcon} alt="A minus icon" />
          </button>
        </div>

        <div className="col col-commenter">
          <div className="row">
            <img
              className="commenter-logo"
              src={getAvatar(currentReply.user.image.png)}
              alt="A profile photo"
            />

            <h1 className="commenter-name">{currentReply.user.username}</h1>

            {isCurrentUserReply && <span className="you">You</span>}

            <p className="when-posted">{currentReply.createdAt}</p>

            <div className="edit-or-reply">
              {isCurrentUserReply && (
                <button
                  className="delete-btn"
                  onClick={handleDeleteReply}
                  disabled={isReplyFormOpen}
                >
                  <img src={deleteIcon} alt="A delete icon" />
                  Delete
                </button>
              )}

              <button
                className={`reply-btn ${isReplyFormOpen ? "disabled-btn" : ""}`}
                onClick={handleReplyAction}
                disabled={isReplyFormOpen}
              >
                <img
                  src={isCurrentUserReply ? editIcon : replyIcon}
                  alt={isCurrentUserReply ? "Edit" : "Reply"}
                />

                {isCurrentUserReply ? "Edit" : "Reply"}
              </button>
            </div>
          </div>

          <div className="row">
            <p className="comment-content">
              <span className="replying-to">@{currentReply.replyingTo} </span>
              {currentReply.content}
            </p>
          </div>
        </div>
      </div>

      {isReplyFormOpen && (
        <div className="reply-form">
          <textarea
            id="add-reply"
            name="add-reply"
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            placeholder={`Reply to @${currentReply.user.username}`}
          />

          <button onClick={handleAddReply}>Reply</button>
        </div>
      )}
    </>
  );
}
