import React, { useEffect, useState } from "react";
import axios from "axios";

function Chat({ videoId, handleDateFormat, paneWidth, viewportWidth }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (videoId !== '') {
    async function fetchVideoComments() {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; 
      const maxResults = 100;

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
  }
  }, [videoId]);

  if (comments.length === 0) {
    return <p className="comments-error">Select a video with comments enabled to view the comments here.</p>;
  } else {
    return (
      <div className="chat-wrapper">
        <ul className="chat-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div 
              // style={commentStyles}
              >
                <div className="comment-header">
                  <div className="comment-header-img">
                    <img
                      src={
                        comment.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                    ></img>
                  </div>
                  <div className="comment-header-text">
                    <span>
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </span>
                    <span>
                      {handleDateFormat(
                        comment.snippet.topLevelComment.snippet.publishedAt
                      )}
                    </span>
                  </div>
                </div>
                <div className="comment-body">
                  <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Chat;
