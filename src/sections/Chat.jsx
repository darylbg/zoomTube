import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(inputValue);
  };

  useEffect(() => {
    if (searchInput !== "") {
      const apiKey = "AIzaSyCk_cO8UzS_H1vab6iGke7RSS0xJt1BAu8";
      const keyword = searchInput;
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
    }
  }, [searchInput]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
  //       params: { q: 'justin+bieber' },
  //       headers: {
  //         'X-RapidAPI-Key': '1c2ee0c8b6mshadd74d1b6d62652p1cc7c1jsnfd786e944a0e',
  //         'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
  //       }
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="chat">
      <form onSubmit={handleSearchInput}>
        <input
          type="search"
          value={inputValue}
          placeholder="Search YouTube"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
        <button type="submit">search</button>
      </form>
      <h3>Chat</h3>
      <ul>
        {searchResults &&
          searchResults.map((result) => (
            <li key={result.id.videoId}>{result.snippet.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default Chat;
