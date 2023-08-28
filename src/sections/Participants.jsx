import React, { useState, useEffect } from "react";
import PlayButtonImg from '../assets/images/play-button-icon-png-18919.png'
import { Youtube } from "feather-icons-react/build/IconComponents";

function Participants({handleSelectedVideo}) {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(inputValue);
  };

  useEffect(() => {
    const api_key = process.env.REACT_APP_YOUTUBE_API_KEY
    if (searchInput !== "") {
      const apiKey = api_key;
      const keyword = searchInput;
      const maxResults = 20;

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

  // console.log(searchResults)

  const handleDateFormat = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="participants-sidebar">
      <div>
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
      </div>
      <div>
        <ul className="search-results">
          {searchResults &&
            searchResults.map((result) => (
              <li key={result.id.videoId} data-id={result.id.videoId} onClick={handleSelectedVideo}>
                  <div className="search-results-img">
                    <img className="img-1" src={result.snippet.thumbnails.default.url}></img>
                    <img className="img-2" src={PlayButtonImg}></img>
                  </div>
                  <div className="search-results-text">
                    <div className="search-results-text-title">
                      <p>{result.snippet.title}</p>
                    </div>

                    <div className="search-results-text-body">
                      <p>{result.snippet.channelTitle}</p>
                      <p>{handleDateFormat(result.snippet.publishedAt)}</p>
                    </div>
                  </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Participants;
