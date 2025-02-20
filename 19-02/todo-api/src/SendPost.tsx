import { useState } from "react";
import "./SendPost.css";

interface ISendPost {
  userId: string;
  title: string;
  body: string;
}

const SendPost = () => {
  const [postData, setPostData] = useState<ISendPost>({
    userId: "",
    title: "",
    body: "",
  });
  const [postResponse, setPostResponse] = useState<ISendPost | null>(null);
  const [postResponseCode, setPostResponseCode] = useState<number>(0);
  const [postError, setPostError] = useState<string | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostLoading(true);
    setPostError(null);
    setPostResponse(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error("Failed to send post.");
      }

      const data = await res.json();
      setPostResponseCode(res.status);
      setPostResponse(data);
    } catch (error) {
      setPostError((error as Error).message);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="outer-box">
      <div className="form-container">
        <h2>Create Post</h2>

        <form onSubmit={submitPost}>
          <div className="input-box">
            <input
              type="number"
              name="userId"
              placeholder="User ID"
              value={postData.userId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={postData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-box">
            <textarea
              name="body"
              placeholder="Body"
              value={postData.body}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="button-box">
            <button type="submit" className="submit-button">
              {postLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {postLoading && (
          <p className="loading-message">Processing request...</p>
        )}

        {postError && (
          <div className="error-box">
            <p className="error-message">{postError}</p>
          </div>
        )}

        {postResponse && (
          <div className="response-box">
            <h3 className="response-code">Response Code: {postResponseCode}</h3>
            <h3 className="response-title">Response:</h3>
            <p className="response-body">
              {JSON.stringify(postResponse, null, 2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendPost;
