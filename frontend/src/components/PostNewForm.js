import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, notification } from "antd";
import { PlusOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import { axiosInstance } from "utils/api";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/form";
import { useHistory } from "react-router-dom";

export default function PostNewForm() {
  const { jwtToken } = useAppContext().store;
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    console.log("filedata " ,fileList)
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }
    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const handleFinish = async (fieldValues) => {
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    fileList.forEach((file) => formData.append("photo", file.originFileObj));

    const headers = { Authorization: `JWT ${jwtToken}` };
    console.log("fileList " ,fileList)
    try {
      const response = await axiosInstance.post("/api/posts/", formData, {
        headers,
      });

      notification.open({
        message: "게시글 작성 확인",
        description: "게시글 작성하였습니다 ",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버 오류",
            description: `게시물 작성 에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete={"false"}>
      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요" }]}
        hasFeedback
        {...fieldErrors.photo}>
         
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}>
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
       
      </Form.Item>
      <Form.Item
        label="제목"
        name="location"
        rules={[{ required: true, message: "제목을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.location}>
        <Input />
      </Form.Item>

      <Form.Item
        label="내용"
        name="caption"
        rules={[{ required: true, message: "내용을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="태그"
        name="tag"
        rules={[{ required: false, message: "tag을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Modal
        open={previewPhoto.visible}
        onCancel={() => setPreviewPhoto({ visible: false })}>
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>

      <hr />
    </Form>
  );
}
