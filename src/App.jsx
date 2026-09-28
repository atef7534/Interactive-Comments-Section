import { useEffect, useState } from "react";
import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data: rows, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
      return;
    }

    const topLevelComments = rows
      .filter((row) => row.parent_id === null)
      .map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: formatCreatedAt(comment.created_at),
        score: comment.score,
        user: {
          username: comment.username,
          image: {
            png: comment.avatar,
          },
        },
        replies: rows
          .filter((reply) => reply.parent_id === comment.id)
          .map((reply) => ({
            id: reply.id,
            content: reply.content,
            createdAt: formatCreatedAt(reply.created_at),
            score: reply.score,
            replyingTo: reply.replying_to,
            user: {
              username: reply.username,
              image: {
                png: reply.avatar,
              },
            },
          })),
      }));

    setComments(topLevelComments);
    setLoading(false);
  }

  async function handleAddComment(content) {
    const { data: newComment, error } = await supabase
      .from("comments")
      .insert({
        content,
        score: 0,
        username: data.currentUser.username,
        avatar: data.currentUser.image.png,
        parent_id: null,
        replying_to: null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding comment:", error);
      return;
    }

    const commentToAdd = {
      id: newComment.id,
      content: newComment.content,
      createdAt: "just now",
      score: newComment.score,
      user: {
        username: newComment.username,
        image: {
          png: newComment.avatar,
        },
      },
      replies: [],
    };

    setComments((prevComments) => [...prevComments, commentToAdd]);
  }

  if (loading) {
    return <p>Loading comments...</p>;
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

function formatCreatedAt(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.floor((now - createdAt) / 1000);

  if (differenceInSeconds < 60) {
    return "just now";
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);

  if (differenceInMinutes < 60) {
    return \`\${differenceInMinutes} minute\${differenceInMinutes === 1 ? "" : "s"} ago\`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return \`\${differenceInHours} hour\${differenceInHours === 1 ? "" : "s"} ago\`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays < 30) {
    return \`\${differenceInDays} day\${differenceInDays === 1 ? "" : "s"} ago\`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);

  return \`\${differenceInMonths} month\${differenceInMonths === 1 ? "" : "s"} ago\`;
}
