import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "antd";

const Search = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      history.push(`/search?query=${searchTerm}`);
      setSearchTerm("");
    } else {
      alert("검색어가 없습니다");
    }
  };

  return (
    <Input.Search
      placeholder="검색어를 입력하세요"
      value={searchTerm}
      onChange={handleInputChange}
      onSearch={handleSearch}
      enterButton
    />
  );
};

export default Search;
