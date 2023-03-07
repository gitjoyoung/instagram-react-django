import React, { useState ,useEffect } from "react";
import { axiosInstance } from "utils/api";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Row, Col, Form, Input, Button, notification, Card } from "antd";
import { useHistory } from "react-router-dom";
import AppHeader from "components/applayout/AppHeader";
import { useAppContext } from "store";
export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  //로그인 상태 감지 로그인이 되있다면 홈페이지로
  const {
    store: { isAuthenticated },
  } = useAppContext();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      notification.open({
        message: "회원가입",
        description: " 현재 로그인 상태입니다 ",
        icon: <SmileOutlined style={{ color: "#2be37f" }} />,
      });
    }
  }, [isAuthenticated, history]);



  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        await axiosInstance.post("/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: "m1 m2", password: [] }
          // python: mydict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                // errors : ["m1", "m2"].join(" ") => "m1 "m2"
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <div className="Sign">
      <AppHeader />
      <div className="contents">
        <Row gutter={24}>
          <Col span={8}></Col>
          <Col span={8}>
            <Card title="회원가입">
              <Form
                // {...Layout}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your userid" },
                    {
                      min: 4,
                      message: "4글자 입력해주세요",
                    },
                  ]}
                  hasFeedback
                  {...fieldErrors.username}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  {...fieldErrors.password}>
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      alignContent: "center",
                    }}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col align="middle" span={8}></Col>
        </Row>
      </div>
    </div>
  );
}
