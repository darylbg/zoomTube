import React, { useState, useEffect } from "react";
import { X, Check } from "feather-icons-react/build/IconComponents";
import PlayButtonImg from "../assets/images/play-button-icon-png-18919.png";
import { Accordion } from "react-bootstrap";

function Participants({
  handleSelectedVideo,
  handleMyNameChange,
  nameValue,
  setNameValue,
  handleClearNameInput,
  handleVideoNameChange,
  handleClearVideoNameInput,
  videoNameValue,
  setVideoNameValue,
  toggleVideoView,
  handleDateFormat
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(inputValue);
  };

  useEffect(() => {
    const api_key = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (searchInput !== "") {
      const apiKey = api_key;
      const keyword = searchInput;
      const maxResults = 50;

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=${maxResults}&key=${apiKey}`;

      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log(data)
          setSearchResults(data.items);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [searchInput]);

  return (
    <div className="participants-sidebar">
      <div className="participants-sidebar-wrapper">
      <Accordion className="rename-accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="rename-accordion-header"><span>Update participant labels</span></Accordion.Header>
          <Accordion.Body>
            <form className="name-change-form">
              <label>Update my label</label>
              <input
                type="text"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              ></input>
              <X
                onClick={handleClearNameInput}
                className="name-change-x cursor-pointer"
              />
              <Check
                onClick={handleMyNameChange}
                className="name-change-update cursor-pointer"
              />
              {toggleVideoView ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    Update video label
                  </label>
                  <input
                    type="text"
                    value={videoNameValue}
                    onChange={(e) => {
                      setVideoNameValue(e.target.value);
                    }}
                  ></input>
                  <X
                    onClick={handleClearVideoNameInput}
                    className="name-change-x cursor-pointer"
                  />
                  <Check
                    onClick={handleVideoNameChange}
                    className="name-change-update cursor-pointer"
                  />
                </>
              ) : null}
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>
        <form
          onSubmit={handleSearchInput}
          className="youtube-search-form"
          style={{ marginTop: "10px" }}
        >
          <label>Search a Youtube video</label>
          <input
            type="search"
            value={inputValue}
            placeholder="Search..."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></input>
          <button type="submit" className="video-search-btn">
            search
          </button>
        </form>
      </div>
      </div>
      <div className="search-results-wrapper">
        <ul className="search-results">
          {searchResults &&
            searchResults.map((result) => (
              <li
                key={result.id.videoId}
                data-id={result.id.videoId}
                onClick={handleSelectedVideo}
              >
                <div className="search-results-img">
                  <img
                    className="img-1"
                    src={result.snippet.thumbnails.default.url}
                  ></img>
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
