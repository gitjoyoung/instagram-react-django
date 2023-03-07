import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "components/applayout/AppHeader";
import { axiosInstance } from "utils/api";
import { Alert } from "antd";
import { useAppContext } from "store";
const SearchList = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([null]);

  console.log("searchResults", searchResults);

  console.log("searchTerm", searchTerm);
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axiosInstance.get("/api/posts/?search=", {
          headers,
          params: {
            username: searchTerm,
          },
        });
        console.log("data",  data );
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <h1>Search Results for "{searchTerm}"</h1>
      {searchResults && searchResults.length ? (
        searchResults.map(
          (post) =>
            post && (
              <div key={post.id}>
                <img src={post.photo} alt={post.caption} />
                <p>{post.caption}</p>
                <p>{post.author.username}</p>
              </div>
            )
        )
      ) : (
        <Alert message={`No results for "${searchTerm}"`} type="warning" />
      )}
    </>
  );
};

export default SearchList;
