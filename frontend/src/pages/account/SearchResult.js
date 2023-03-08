import React from "react";
import SearchList from "components/SearchList";
import AppHeader from "components/applayout/AppHeader";
import AppFooter from "components/applayout/AppFooter";
import "./SearchResult.scss";
function SearchResult() {
  return (
    <div className="SearchResult">
      <div className="SearchResult_header">
        <AppHeader />
      </div>
      <div className="SearchResult_contents">
        <SearchList />
      </div>

      <div className="SearchResult_footer">
        <AppFooter />
      </div>
    </div>
  );
}

export default SearchResult;
