import React, { useState } from "react";
import { Avatar, Card, Button, Modal, Tooltip } from "antd";
import "./Post.scss";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import moment from "moment";
import CommentList from "./CommentList";

function Post({ post, handleLike, handleDelete, handleUpdate }) {
  const { author, caption, location, photo, is_like, created_at } = post;
  const { username, avatar_url } = author;

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
              width: "800px",
              height: "800px",
              position: "relative",
            }}>
            <img
              alt="ModalImg"
              src={photo}
              style={{
                margin: "10px",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
              }}></img>
          </div>
          <div
            style={{
              width: "270px",
              maxHeight: "800px",
              overflowY: "auto",
              marginTop: "20px",
            }}>
            <CommentList post={post} />
          </div>
        </div>
      </Modal>
      <Card
        hoverable
        size="small"
        title={
          <>
            <div
              style={{
                height:"100%",
                display: "flex",
                alignItems: "center",
              }}>
              <Avatar
                size="small"
                icon={<img src={avatar_url} alt={username}></img>}></Avatar>

              <h3 style={{ margin: "10px " }}>{username}</h3>
              <h5  style={{ margin: "1px " }} >{moment(created_at).fromNow()}</h5>
              <div></div>
            </div>
          </>
        }
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
                maxWidth: "95%",
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
        <CommentList post={post}></CommentList>
      </Card>
    </div>
  );
}

export default Post;
