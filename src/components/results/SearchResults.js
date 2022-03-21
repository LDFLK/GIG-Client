import React, {useState} from "react";
import {withStyles} from '@mui/styles';
import {useParams} from 'react-router-dom'
import Grid from "@mui/material/Grid/Grid";
import {Styles} from "./Styles";
import {getResults} from "@lsflk/gig-client-shared/functions";
import InfiniteList from "@lsflk/gig-client-shared/components";
import MainContentList from "@lsflk/gig-client-shared/components";
import {generateSearchQuery} from "@lsflk/gig-client-shared/functions";


function SearchResults(props) {

  const {searchParam} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [searchState, setSearchState] = useState("");
  const {classes, setIsLoading} = props;

  async function getSearchResults(initialSearch) {
    if (searchParam.length > 1) {
      const searchUrl = generateSearchQuery(searchParam);
      let result = await getResults(searchUrl, initialSearch, searchResults, searchPage, setSearchResults, setSearchPage, 15);
      setIsLoading(false);
      return result
    }
    return false
  }

  if (searchParam !== searchState) {
    console.log("loading search results:", searchParam);
    getSearchResults(true);
    setSearchState(searchParam);
  }

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item lg={3} className={classes.leftContentColumn}/>
      <Grid item lg={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={searchResults}
                      getResultItems={getSearchResults}
                      list={<MainContentList listItems={searchResults}/>}
        />
      </Grid>

    </Grid>
  )
    ;
}

export default withStyles(Styles)(SearchResults);
