import React, { useState } from "react";
import { Avatar, Card, Button, Modal } from "antd";
import "./Post.scss";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

import CommentList from "./CommentList";

function Post({ post, handleLike, handleDelete, handleUpdate }) {
  const { author, caption, location, photo,  is_like } = post;
  const { username,  avatar_url } = author;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="post">
      <Modal
        width={1200}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              textAlign: "center",
              width: "1000px",
              height: "800px",
            }}>
            <img
              alt="ModalImg"
              src={photo}
              style={{
                height: "100%",
              }}></img>{" "}
          </div>
          <div>
            <CommentList post={post} />
          </div>
        </div>
      </Modal>
      <Card
        hoverable
        cover={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <img
              onClick={showModal}
              src={photo}
              alt={caption}
              style={{
                margin: 8,
                maxHeight: 700,
                maxWidth: "100%",
              }}
            />
          </div>
        }
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
          <div>
            <Button onClick={() => handleUpdate(post)}>수정</Button>
          </div>,
          <div>
            <Button onClick={() => handleDelete(post)}>삭제</Button>
          </div>,
        ]}>
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={<img src={avatar_url} alt={username} />}
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}></Card.Meta>

        <CommentList post={post}></CommentList>
      </Card>
    </div>
  );
}

export default Post;
