import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Card } from "antd";
import { useAppContext } from "store";
import { useAxios } from "utils/api";

const SearchList = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const [searchListTerm, setSearchListTerm] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([]);

  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  
  const [{ data: response, loading, error }] = useAxios({
    url: "/api/posts/",
    headers,
    params: {
      username: searchListTerm,
    },
  });

  useEffect(() => {
    setSearchListTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (response) {
      setSearchResults(response);
    }
  }, [response]);

  return (
    <>
      <div>
        <h1>Search Results for "{searchListTerm}"</h1>
        {loading && <p>Loading...</p>}
        {error && (
          <Alert
            message={`로그인후 검색이 가능합니다!! : ${error.message}`}
            type="error"
          />
        )}
        {searchResults.length ? (
          searchResults.map((post, index) => (
            <Card key={post.id}>
              <Card.Meta
                avatar={
                  <img
                    style={{ width: 150, height: 150 }}
                    src={post.photo}
                    alt={post.caption}
                  />
                }
                title={post.author.username}
                description={post.caption}
                style={{ marginBottom: "0.5em" }}
              />
              <p style={{ marginTop: "0.5em", textAlign: "right" }}>
                #{searchResults.length - index}
              </p>
            </Card>
          ))
        ) : (
          <Alert
            message={`No results for "${searchListTerm}"`}
            type="warning"
          />
        )}
      </div>
    </>
  );
};

export default SearchList;
