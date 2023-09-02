import React, { useEffect, useState } from "react";
import axios from "axios";

function Chat({ videoId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchVideoComments() {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; // Replace with your API key
      const maxResults = 50; // You can adjust the number of results per page

      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/commentThreads",
          {
            params: {
              part: "snippet",
              videoId: videoId,
              maxResults: maxResults,
              key: apiKey,
            },
          }
        );

        return response.data.items;
      } catch (error) {
        console.error("Error fetching video comments:", error);
        return [];
      }
    }

    async function fetchAndSetComments() {
      const commentsData = await fetchVideoComments();
      setComments(commentsData);
    }

    fetchAndSetComments();
  }, [videoId]);
  // console.log(comments)
  if (comments.length === 0) {
    return <p>Video has no comments.</p>;
  } else {
    return (
      <div className="chat-wrapper">
        <ul className="chat-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Chat;
