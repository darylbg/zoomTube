import React, { useState, useEffect } from "react";

function Chat() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const apiKey = "AIzaSyCk_cO8UzS_H1vab6iGke7RSS0xJt1BAu8";
    const keyword = "react";
    const maxResults = 10;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=${maxResults}&key=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSearchResults(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(searchResults[0].snippet);
  return (
    <div className="chat">
      <h3>Chat</h3>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id.videoId}>{result.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
