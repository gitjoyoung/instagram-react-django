import React, { useEffect, useState, useRef } from "react";
import { useAxios } from "utils/api";
import { axiosInstance } from "utils/api";
import Skeleton from "react-loading-skeleton";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert, Button, Badge, Avatar, Col, Row } from "antd";
function PostList() {
  //jwt 인증 토큰 발급 받아오기

  const {
    store: { jwtToken },
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [newPostCount, setNewPostCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  // 포스트 정보를 받아온다
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/api/posts/", {
          headers,
        });
        setPostList(data);
        setInitialLoad(false);
      } catch (error) {
        console.log("error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [refresh]);

  // 좋아요를 누를때마다 동작하는 함수 async은 비동기 처리를 뜻한다 값으로는 post 와 islike 를 받고
  // apiurl 에 요청할 주소를 담고
  // 메소드에 좋아요의 선택을 담아서
  // 콘솔 로그에 좋아요를 표시한다

  const handleLike = async ({ post, isLike }) => {
    const method = isLike ? "POST" : "DELETE";

    console.log("method :", method);

    // try 구문 으로 에러처리를 하고
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

  //삭제 수정시  알럿
  function showConfirm() {
    const result = window.confirm("삭제 하시겠습니까?");
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  // 포스트 수정 기능 구현
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

  // 포스트 삭제 기능 구현
  const handleDelete = async (post) => {
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

  //팔로잉 직후 리프레쉬를
  const handleRefresh = () => {
    const newPosts = postList.filter(
      (post) => !postList.some((existingPost) => existingPost.id === post.id)
    );
    setNewPostCount(newPosts.length);
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
      <div style={{ textAlign: "center" }}>
        <Badge count={newPostCount} overflowCount={100}>
          <Button onClick={handleRefresh}>
            <p>NEW FEED </p>
          </Button>
        </Badge>
      </div>

      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이없습니다"></Alert>
      )}
      {postList &&
        postList.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              handleLike={handleLike}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          );
        })}
    </div>
  );
}

export default PostList;
