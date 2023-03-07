import React from "react";
import { Button } from "antd";
import SuggestionList from "components/SuggestionList";
import StroyList from "components/StoryList";
import { useHistory } from "react-router-dom";

function SideBar() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/posts/new");
  };
  return (
    <div className="sidebar">
      <>
        <Button
          type="primary"
          block
          style={{ marginBottom: "1rem" }}
          onClick={handleClick}>
          새 포스팅 쓰기
        </Button>
        <StroyList style={{ marginBottom: "1rem" }}></StroyList>
        <SuggestionList></SuggestionList>
      </>
    </div>
  );
}

export default SideBar;
