import React from 'react'
import SearchList from "components/SearchList";
import AppHeader from 'components/applayout/AppHeader';
import AppFootter from 'components/applayout/AppFooter';


function SearchResult() {
  return (
    <div>
      <AppHeader></AppHeader>
      <SearchList></SearchList>
      <AppFootter></AppFootter></div>
  )
}

export default SearchResult