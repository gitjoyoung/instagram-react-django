import React, { useState } from "react";
import { Avatar, Card, Button, Modal } from "antd";
import "./Post.scss";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import moment from "moment";
import CommentList from "./CommentList";
import PostModal from "./PostModal";

const Post = React.memo(({ post, handleLike, handleUpdate, handleDelete }) => {
  const { author, caption, location, photo, is_like, created_at } = post;
  const { username, avatar_url } = author;

  console.log("그림 여러개 일시 어떻게 가져오나보자", post);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="post">
      <Card
        hoverable
        size="small"
        title={
          <>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}>
              <Avatar
                size="small"
                icon={<img src={avatar_url} alt={username}></img>}></Avatar>

              <h3 style={{ margin: "10px " }}>{username}</h3>
              <h5 style={{ margin: "1px " }}>{moment(created_at).fromNow()}</h5>
              <div></div>
            </div>
          </>
        }
        cover={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <img
                onClick={() => handleModalOpen(true)}
                src={photo}
                alt={caption}
                style={{
                  margin: 8,
                  maxHeight: 700,
                  maxWidth: "95%",
                }}
              />
            </div>
          </>
        }
        actions={[]}>
        <div>
          {is_like ? (
            <HeartTwoTone
              style={{ fontSize: "20px" }}
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined style={{ fontSize: "20px" }} onClick={() => handleLike({ post, isLike: true })} />
          )}
        </div>
        <p style={{ fontSize: "12px" }}>제목 {post.location}</p>
        <p style={{ fontSize: "11px" }}>내용 {post.caption}</p>
        <CommentList post={post}></CommentList>

        <PostModal
          post={post}
          isOpen={isModalOpen}
          isClose={handleModalClose}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </Card>
    </div>
  );
});

export default Post;
