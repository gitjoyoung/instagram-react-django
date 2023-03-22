import React, { useEffect, useState } from "react";
import { axiosInstance } from "utils/api";
import Skeleton from "react-loading-skeleton";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert, Button, Badge } from "antd";

import "./PostList.scss";
function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [prevPostCount, setPrevPostCount] = useState(0);

  const [newPostCount, setNewPostCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // 처음 게시물 업로드
  useEffect(() => {
    const newFetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/api/posts/", {
          headers,
        });

        if (prevPostCount === 0) {
          setPrevPostCount(data.length);
        }
        setPostList(data);
      } catch (error) {
        console.log("error :", error);
      } finally {
        setIsLoading(false);
      }
    };
    newFetchPosts();
  }, [refresh]);

  // 새로운 글 실시간 조회
  useEffect(() => {
    const newFetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/api/posts/", {
          headers,
        });

        if (data && prevPostCount > 0) {
          if (data.length - prevPostCount > 0) {
            setNewPostCount(data.length - prevPostCount);
          } else {
            setNewPostCount(0);
          }
        }
      } catch (error) {
        console.log("error :", error);
      }
    };
    newFetchPosts();

    const intervalId = setInterval(newFetchPosts, 5000);

    return () => clearInterval(intervalId);
  }, [prevPostCount]);

  // 리프레쉬 버튼
  const handleRefresh = () => {
    setPrevPostCount(0);

    setRefresh((prevRefresh) => !prevRefresh);
  };

  //좋아요 버튼
  const handleLike = async ({ post, isLike }) => {
    const method = isLike ? "POST" : "DELETE";

    try {
      await axiosInstance({
        url: `/api/posts/${post.id}/like/`,
        method,
        headers,
      });

      setPostList((prevList) =>
        prevList.map((currentPost) =>
          currentPost.id === post.id
            ? { ...currentPost, is_like: isLike }
            : currentPost
        )
      );
    } catch (error) {
      console.log("error :", error);
    }
  };

  //글 수정 업데이트
  const handleUpdate = async (post) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/posts/${post.id}/`,
        { caption: post.caption },
        { headers }
      );
      setPostList((prevList) =>
        prevList.map((currentPost) =>
          currentPost.id === post.id ? { ...data } : currentPost
        )
      );
    } catch (error) {
      console.log("error :", error);
    }
  };

  //삭제
  const handleDelete = async (post) => {
    const showConfirm = () => window.confirm("삭제 하시겠습니까?");

    if (showConfirm()) {
      try {
        await axiosInstance.delete(`/api/posts/${post.id}/`, { headers });
        setPostList((prevList) =>
          prevList.filter((currentPost) => currentPost.id !== post.id)
        );
      } catch (error) {
        window.alert("본인의 글만 삭제할수 있습니다");
        console.log("error :", error);
      }
    }
  };

  // 스켈레톤 효과 로딩시
  if (isLoading) {
    return (
      <div className="contents">
        {Array(10)
          .fill()
          .map((item, index) => (
            <div key={index}>
              <Skeleton height={200} />
              <Skeleton count={3} />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="PostList_badge" style={{ textAlign: "center" }}>
        <Badge count={newPostCount} overflowCount={100}>
          <Button onClick={handleRefresh}>
            <p>NEW FEED</p>
          </Button>
        </Badge>
      </div>

      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다"></Alert>
      )}
      {postList &&
        postList.map((post) => (
          <Post
            key={post.id}
            post={post}
            handleLike={handleLike}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
    </div>
  );
}

export default PostList;
