import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import stories from "./images/stories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from './styles';
import { getPosts } from './actions/posts';

const App = function () {
  // useState returns an item and updater fucntion setItem.
  // the item is a variable that stores the value of the state
  // setItem is used to update the value of the item
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  // dispatch is used to tirgger the state update process
  // it sends the action to all the reducers 
  const dispatch = useDispatch();

  // useEffect is used responding to changes in the component lifecycle -> for mounting, re-rednering and unmounting the DOM 
  // By including currentId and dispatch as dependencies, the effect will re-run whenever either currentId or dispatch changes
  // ensuring that the getPosts() action is dispatched when these dependencies change.
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Stories
        </Typography>
        <img className={classes.image} src={stories} alt="stories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
