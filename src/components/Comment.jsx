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

export default function Comment(props) {
  // Like state for the main comment
  const [commentLike, setCommentLike] = useState(false);
  // Replies state
  const [replies, setReplies] = useState(props.comment.replies);

  const [plusFocus, setPlusFocus] = useState(false);
  const [minusFocus, setMinusFocus] = useState(false);

  function handleCommentLike(p) {
    if (p === -1) {
      setCommentLike(false);
    } else {
      setCommentLike(true);
    }
  }

  function handleRepliesLike(index, p) {
    setReplies((prevReplies) =>
      prevReplies.map((reply, i) => {
        if (i !== index) {
          return reply;
        }

        if (p === 1 && !reply.liked) {
          return {
            ...reply,
            score: reply.score + 1,
            liked: true,
          };
        }

        if (p === -1 && reply.liked) {
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

  function handlePlusFocus() {
    setPlusFocus(true);
    setMinusFocus(false);
  }

  function handleMinusFocus() {
    setPlusFocus(false);
    setMinusFocus(true);
  }

  return (
    <>
      <div className="comment">
        <div className="col col-rate">
          <button
            className="btn-cnt"
            onFocus={() => handlePlusFocus()}
            onClick={() => handleCommentLike(1)}
          >
            <img src={plusFocus ? plusIconFocus : plusIcon} alt="A plus icon" />
          </button>
          <p className="likes"> {props.comment.score + commentLike} </p>
          <button
            className="btn-cnt"
            onFocus={() => handleMinusFocus()}
            onClick={() => handleCommentLike(-1)}
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
              src={getAvatar(props.comment.user.image.png)}
              alt="A profile photo"
            />
            <h1 className="commenter-name"> {props.comment.user.username} </h1>
            {props.comment.user.username === props.username && (
              <span className="you">You</span>
            )}
            <p className="when-posted"> {props.comment.createdAt} </p>
            <div className="edit-or-reply">
              {props.comment.user.username === props.username && (
                <button className="delete-btn">
                  <img src={deleteIcon} alt="A reply icon" />
                  Delete
                </button>
              )}
              <button className="reply-btn">
                <img
                  src={
                    props.comment.user.username === props.username
                      ? editIcon
                      : replyIcon
                  }
                  alt="A reply icon"
                />
                {props.comment.user.username === props.username
                  ? "Edit"
                  : "Reply"}
              </button>
            </div>
          </div>
          <div className="row">
            <p className="comment-content"> {props.comment.content} </p>
          </div>
        </div>
      </div>
      <div className="replies-container">
        {replies.map((reply, index) => (
          <Reply
            key={reply.id}
            reply={reply}
            index={index}
            handleRepliesLike={handleRepliesLike}
            userName={props.username}
          />
        ))}
      </div>
    </>
  );
}
