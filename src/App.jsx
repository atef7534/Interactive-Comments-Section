import CommentsPerUser from "./components/CommentsPerUser";
import AddComment from "./components/AddComment";
import data from "../data.json";

export default function App() {
  return (
    <>
      <CommentsPerUser />
      <AddComment currentUser={data.currentUser} />
    </>
  );
}
