import React from "react";
import { Avatar, Card ,Button } from "antd";
import "./Post.scss";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

import CommentList from "./CommentList";

function Post({ post, handleLike, handleDelete ,handleUpdate}) {
  const { author, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = author;

  return (
    <div className="post">
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),   <div>
          <Button onClick={() => handleUpdate(post)}>수정</Button>
        </div>,  <div>
          <Button onClick={() => handleDelete(post)}>삭제</Button>
        </div>
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
