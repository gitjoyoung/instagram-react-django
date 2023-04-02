import React from "react";
import PostList from "components/PostList";
import SideBar from "components/SideBar";
import AppHeader from "components/applayout/AppHeader";
import AppFooter from "components/applayout/AppFooter";
import "./Home.scss";
import { defaultLogMessages } from "../utils/consolMessages";


function Home() {
  const consolView = false;
  defaultLogMessages(consolView);
  return (
    <div className="Home">
      <div className="home_header">
        <AppHeader />
      </div>
      <div className="home_contents">
        <PostList />
      </div>
      <div className="home_sidebar">
        {" "}
        <SideBar />
      </div>

      <div className="home_footer">
        <AppFooter />
      </div>
    </div>
  );
}

export default Home;
