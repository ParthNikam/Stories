import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({ author: "", title: "",
      message: "", tags: "", selectedFile: "", 
    });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // if there's an Id, then update otherwise just create a post
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId = null;
    setPostData({author: "", title: "", message: "", tags: "", selectedFile: ""});
  };

  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Create"} a Story
        </Typography>

        {/* Author  */}
        <TextField
          name="Author"
          variant="outlined"
          label="author"
          value={postData.author}
          fullWidth
          onChange={(e) => setPostData({ ...postData, author: e.target.value })}
        />

        {/* Title  */}
        <TextField
          name="Title"
          variant="outlined"
          label="title"
          value={postData.title}
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        {/* Message */}
        <TextField
          name="Message"
          variant="outlined"
          label="message"
          value={postData.message}
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        {/* Tags */}
        <TextField
          name="Tags"
          variant="outlined"
          label="tags"
          value={postData.tags}
          fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />

        {/* FileInput */}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          type="submit"
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
        
        <Button
          type="submit"
          className={classes.buttonClear}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
