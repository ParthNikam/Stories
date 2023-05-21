import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import { createPost } from "../../actions/posts"
import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    author: "", 
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createPost(postData));
  };

  const clear = () => {};


  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create a Story</Typography>
        
        {/* Author  */}
        <TextField
          name="Author" variant="outlined" label="author" value={postData.author} fullWidth
          onChange={(e) => setPostData({ ...postData, author: e.target.value })}
        />

        {/* Title  */}
        <TextField
          name="Title" variant="outlined" label="title" value={postData.title} fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        {/* Message */}
        <TextField
          name="Message" variant="outlined" label="message" value={postData.message} fullWidth
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        {/* Tags */}
        <TextField
          name="Tags" variant="outlined" label="tags" value={postData.tags} fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        
        {/* FileInput */}
        <div className={classes.fileInput}>
          <FileBase 
            type="file" multiple={false}
            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
            />
        </div>

        <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" >Submit</Button>
        <Button type="submit" variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>

      </form>
    </Paper>
  );
};

export default Form;
