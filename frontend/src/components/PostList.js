import React, { useEffect, useState } from "react";
import { useAxios } from "utils/api";
import { axiosInstance } from "utils/api";
import Skeleton from "react-loading-skeleton";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert, Button } from "antd";

function PostList() {
  //jwt 인증 토큰 발급 받아오기
  const {
    store: { jwtToken },
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [postList, setPostList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/api/posts/", {
          headers,
        });
        setPostList(data);
      } catch (error) {
        console.log("error :", error);
      }finally {
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

  //팔로잉 직후 표시되지 않는 현상 새로고침
  const handleRefresh = () => {
    setRefresh(!refresh);
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
      <div>
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이없습니다"></Alert>
      )}
      {postList &&
        postList.map((post) => {
          return <Post post={post} key={post.id} handleLike={handleLike} />;
        })}
    </div>
  );
}

export default PostList;
