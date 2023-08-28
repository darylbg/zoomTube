import React, { useEffect, useState } from "react";
const axios = require("axios");

function Chat({ videoId }) {
  useEffect(() => {
    async function fetchVideoComments() {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const youtubeVideoId = videoId;
      const maxResults = 50; // You can adjust the number of results per page

      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads`,
          {
            params: {
              part: "snippet",
              videoId: youtubeVideoId,
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

    async function main() {
      const comments = await fetchVideoComments();
      console.log("Video comments:", comments);
    }

    main();
  }, [videoId]);

  return <div>chat</div>;
}

export default Chat;
