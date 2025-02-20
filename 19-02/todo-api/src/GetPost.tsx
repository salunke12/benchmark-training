import { useState } from "react";
import "./GetPost.css";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const GetPost = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [postComment, setPostComment] = useState<IComment[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [postCommentId, setPostCommentId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responseCode, setResponseCode] = useState<number>(0);

  const fetchSinglePost = async () => {
    if (!postId.trim()) {
      setPost(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (!response.ok) throw new Error("Post not found!");
      const data: IPost = await response.json();
      setPost(data);
      setResponseCode(response.status);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPost = async () => {
    if (!postCommentId.trim()) {
      setPostComment([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postCommentId}/comments`
      );
      if (Number(postCommentId) > 100) throw new Error("Comments not found!");
      const data: IComment[] = await response.json();
      setPostComment(data);
      setResponseCode(response.status);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => {
    setPost(null);
    setPostComment([]);
    setPostId("");
    setPostCommentId("");
    setError(null);
    setResponseCode(0);
  };

  return (
    <div className="container">
      <h2 className="title">Fetch Posts & Comments</h2>

      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Post ID..."
          onChange={(e) => setPostId(e.target.value)}
          value={postId}
          className="input-field"
        />
        <button onClick={fetchSinglePost} className="button">
          Fetch Post
        </button>
      </div>

      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Post ID for Comments..."
          onChange={(e) => setPostCommentId(e.target.value)}
          value={postCommentId}
          className="input-field"
        />
        <button onClick={fetchUserPost} className="button">
          Fetch Comments
        </button>
      </div>

      <button onClick={resetResults} className="button reset">
        Reset
      </button>

      <div>
        {loading && <p>Loading data...</p>}
        {error && <div className="error-message">{error}</div>}

        {post && (
          <div className="result-box">
            <h3>Post Details</h3>
            <p>
              <strong>User ID:</strong> {post.userId}
            </p>
            <p>
              <strong>ID:</strong> {post.id}
            </p>
            <p>
              <strong>Title:</strong> {post.title}
            </p>
            <p>
              <strong>Body:</strong> {post.body}
            </p>
            <h3 className="response-code">Status: {responseCode}</h3>
          </div>
        )}

        {postComment.length > 0 && (
          <div>
            <h3>Comments</h3>
            {postComment.map((comment) => (
              <div key={comment.id} className="result-box">
                <p>
                  <strong>Post ID:</strong> {comment.postId}
                </p>
                <p>
                  <strong>Comment ID:</strong> {comment.id}
                </p>
                <p>
                  <strong>Name:</strong> {comment.name}
                </p>
                <p>
                  <strong>Email:</strong> {comment.email}
                </p>
                <p>
                  <strong>Comment:</strong> {comment.body}
                </p>
                <h3 className="response-code">Status: {responseCode}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetPost;
