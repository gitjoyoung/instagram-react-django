import React, { useState } from "react";
import { Button, Form, Input, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CommentList from "./CommentList";
import { getBase64FromFile } from "utils/base64";

const PostModal = React.memo(
  ({ post, isOpen, isClose, handleUpdate, handleDelete }) => {
    const [update, setupdate] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState({
      visible: false,
      base64: null,
    });
    const [PostList, setPostList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const handlePreviewPhoto = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64FromFile(file.originFileObj);
      }
      setPreviewPhoto({
        visible: true,
        base64: file.url || file.preview,
      });
    };

    const handleUploadChange = ({ fileList }) => {
      setFileList(fileList);
      console.log("filedata ", fileList);
    };

    const handleBeforeUpload = (file) => {
      if (fileList.length >= 1) {
        console.log("사진은 최대 1개까지만 업로드 가능합니다.");
        return false; // 업로드 막기
      }
      setFileList([...fileList, file]); // 파일 추가
      return false; // 업로드 막기
    };

    if (update) {
      console.log("업데이트 true");
    }

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
              <p>username : {post.author.username}</p>
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
                width: "300px",
                maxHeight: "800px",
                overflowY: "auto",
                marginTop: "20px",
              }}>
              {update ? (
                <Form>
                  <Form.Item label="Upload" valuePropName="fileList">
                    <Upload
                      beforeUpload={handleBeforeUpload}
                      // onChange={handleUploadChange}
                      // onPreview={handlePreviewPhoto}
                      listType="picture-card"
                      fileList={fileList}
                      defaultFileList={[
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: post.photo,
                        },
                      ]}>
                      {fileList.length > 1 ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item label="글제목">
                    <Input defaultValue={post.location} />
                  </Form.Item>
                  <Form.Item label="글내용">
                    <Input size="large" defaultValue={post.caption} />
                  </Form.Item>
                  <Form.Item label="tag">
                    <Input defaultValue={post.tag} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      size="large"
                      onSubmit={() => {
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
                    <p>재목 :{post.location}</p>
                    <p>내용 :{post.caption}</p>
                  </div>
                  <div>댓글들</div>
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
  }
);

export default PostModal;
