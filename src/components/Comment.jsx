import { useState } from "react";
import plusIcon from "../assets/icon-plus.svg";
import plusIconFocus from "../assets/icon-plus-focus.svg";
import minusIcon from "../assets/icon-minus.svg";
import minusIconFocus from "../assets/icon-minus-focus.svg";
import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import Reply from "./Reply";
import { getAvatar } from "../utils/images";
import data from "../../data.json";

export default function Comment({ comment, username }) {
  const [commentVote, setCommentVote] = useState(0);
  const [replies, setReplies] = useState(comment.replies);

  const [plusFocus, setPlusFocus] = useState(false);
  const [minusFocus, setMinusFocus] = useState(false);

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [editedContent, setEditedContent] = useState(comment.content);

  const isCurrentUser = comment.user.username === username;

  function handleCommentVote(vote) {
    setCommentVote(vote);
  }

  function handleRepliesLike(replyIndex, vote) {
    setReplies((previousReplies) =>
      previousReplies.map((reply, index) => {
        if (index !== replyIndex) {
          return reply;
        }

        if (vote === 1 && !reply.liked) {
          return {
            ...reply,
            score: reply.score + 1,
            liked: true,
          };
        }

        if (vote === -1 && reply.liked) {
          return {
            ...reply,
            score: reply.score - 1,
            liked: false,
          };
        }

        return reply;
      }),
    );
  }

  function handleAddReply() {
    const trimmedContent = replyContent.trim();

    if (!trimmedContent) {
      return;
    }

    const newReply = {
      id: Date.now(),
      content: trimmedContent,
      createdAt: "just now",
      score: 0,
      replyingTo: comment.user.username,
      user: {
        image: data.currentUser.image,
        username: data.currentUser.username,
        added: false,
      },
    };

    setReplies((previousReplies) => [...previousReplies, newReply]);
    setReplyContent("");
    setIsReplyFormOpen(false);
  }

  function handleEdit() {
    setEditedContent(commentContent);
    setIsEditing(true);
  }

  function handleSaveEdit() {
    const trimmedContent = editedContent.trim();

    if (!trimmedContent) {
      return;
    }

    setCommentContent(trimmedContent);
    setIsEditing(false);
  }

  function handleReplyAction() {
    setIsReplyFormOpen(true);
  }

  return (
    <>
      <div className="comment">
        <div className="col col-rate">
          <button
            className="btn-cnt"
            onFocus={() => {
              setPlusFocus(true);
              setMinusFocus(false);
            }}
            onClick={() => handleCommentVote(1)}
            disabled={commentVote === 1}
          >
            <img src={plusFocus ? plusIconFocus : plusIcon} alt="A plus icon" />
          </button>

          <p className="likes">{comment.score + commentVote}</p>

          <button
            className="btn-cnt"
            onFocus={() => {
              setPlusFocus(false);
              setMinusFocus(true);
            }}
            onClick={() => handleCommentVote(-1)}
            disabled={commentVote === -1}
          >
            <img
              src={minusFocus ? minusIconFocus : minusIcon}
              alt="A minus icon"
            />
          </button>
        </div>

        <div className="col col-commenter">
          <div className="row">
            <img
              className="commenter-logo"
              src={getAvatar(comment.user.image.png)}
              alt="A profile photo"
            />

            <h1 className="commenter-name">{comment.user.username}</h1>

            {isCurrentUser && <span className="you">You</span>}

            <p className="when-posted">{comment.createdAt}</p>

            <div className="edit-or-reply">
              {isCurrentUser && (
                <button className="delete-btn">
                  <img src={deleteIcon} alt="A delete icon" />
                  Delete
                </button>
              )}

              <button
                className={`reply-btn ${
                  isEditing || isReplyFormOpen ? "disabled-btn" : ""
                }`}
                onClick={isCurrentUser ? handleEdit : handleReplyAction}
                disabled={isEditing || isReplyFormOpen}
              >
                <img
                  src={isCurrentUser ? editIcon : replyIcon}
                  alt={isCurrentUser ? "Edit" : "Reply"}
                />

                {isCurrentUser ? "Edit" : "Reply"}
              </button>
            </div>
          </div>

          <div className="row">
            {isEditing ? (
              <div className="edit-form">
                <textarea
                  value={editedContent}
                  onChange={(event) => setEditedContent(event.target.value)}
                  className="edit-reply"
                />

                <button onClick={handleSaveEdit}>Update</button>
              </div>
            ) : (
              <p className="comment-content">{commentContent}</p>
            )}
          </div>
        </div>
      </div>

      {isReplyFormOpen && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            placeholder={`Reply to @${comment.user.username}`}
            id="add-reply"
          />

          <button onClick={handleAddReply}>Reply</button>
        </div>
      )}

      <div className="replies-container">
        {replies.map((reply, replyIndex) => (
          <Reply
            key={reply.id}
            reply={reply}
            index={replyIndex}
            handleRepliesLike={handleRepliesLike}
            userName={username}
            setAllReplies={setReplies}
          />
        ))}
      </div>
    </>
  );
}
