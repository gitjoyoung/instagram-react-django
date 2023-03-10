import React, { useState } from "react";

import {  Input, Button  } from "antd";
import { axiosInstance, useAxios } from "utils/api";
import { useAppContext } from "store";
import Comment from "./Comment";
export default function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [commentContent, setcommentContent] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [postList, setPostList] = useState([]);
  const [username, avatar_url] = useState([]);

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    console.group("handleComment save");
    console.log(commentContent);
    console.log(headers);
    
    console.groupEnd();
    const apiUrl = `/api/posts/${post.id}/comments/`;

    try {
      const response = await axiosInstance.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      console.log(response);
      setcommentContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      {commentList &&
        commentList.sort((a, b) => a.id - b.id).map((comment) => (
          <Comment key={comment.id} comment={comment}></Comment>
        ))}

      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        onChange={(e) => setcommentContent(e.target.value)}
        value={commentContent}
      ></Input.TextArea>
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글쓰기
      </Button>
    </div>
  );
}
