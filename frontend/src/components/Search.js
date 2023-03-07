import React ,{useState}from "react";
import { useHistory } from "react-router-dom";
import { Input } from "antd";

const Search = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      history.push(`/search?query=${searchTerm}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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