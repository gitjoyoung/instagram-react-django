import React, { useState } from "react";

import { Input, Button } from "antd";
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
      setcommentContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const [maxVisibleComments, setMaxVisibleComments] = useState(2);
  const [showMore, setShowMore] = useState(false);

  // 댓글 표시 개수를 조절하는 함수
  const handleShowMore = () => {
    setShowMore(!showMore);
    if (!showMore) {
      setMaxVisibleComments(commentList.length);
    } else {
      setMaxVisibleComments(2);
    }
  };

  return (
    <div>
      {commentList &&
        commentList
          .sort((a, b) => a.id - b.id)
          .slice(0, maxVisibleComments)
          .map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
          ))}
      {commentList && commentList.length > 2 && (
        <div style={{textAlign:"center" , marginBottom:"12px"}}> 
          <span onClick={handleShowMore} style={{ color: "blue" }}>
            {showMore ? "접기" : `${commentList.length-2}개의 댓글 더 보기`}
          </span>
        </div>
      )}
      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        onChange={(e) => setcommentContent(e.target.value)}
        value={commentContent}></Input.TextArea>
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}>
        댓글쓰기
      </Button>
    </div>
  );
}
