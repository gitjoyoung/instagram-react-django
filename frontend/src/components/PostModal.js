import React, { useState } from "react";
import { Button, Form, Input, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CommentList from "./CommentList";

const PostModal = React.memo(({ post, isOpen, isClose, handleDelete, handleUpdate })=> {
  const [update, setupdate] = useState(false);
  return (
    <div>
      {" "}
      <Modal open={isOpen} onCancel={isClose} width={1200} footer={null}>
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
              src={post.photo}
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
            {update ? (
              <Form>
                <Form.Item label="글제목">
                  <Input defaultValue={post.location} />
                </Form.Item>
                <Form.Item label="글내용">
                  <Input defaultValue={post.caption} />
                </Form.Item>
                <Form.Item label="tag">
                  <Input defaultValue={post.tag} />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                  <Upload
                    listType="picture-card"
                    defaultFileList={[
                      {
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: post.photo,
                      },
                    ]}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    onClick={() => {
                      handleUpdate(post);
                    }}>
                    수정
                  </Button>
                  <Button
                    size="large"
                    onClick={() => {
                      setupdate(false);
                    }}>
                    취소
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <div>
                  <Button
                    onClick={() => {
                      setupdate(true);
                    }}>
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(post);
                    }}>
                    삭제
                  </Button>
                </div>
                <CommentList post={post} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default PostModal;
