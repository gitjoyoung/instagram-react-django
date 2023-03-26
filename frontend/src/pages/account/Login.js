import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";
import { useAppContext, setToken } from "store";
import { parseErrorMessages } from "utils/form";
import { axiosInstance } from "utils/api";
import AppHeader from "components/applayout/AppHeader";
import AppFootter from "components/applayout/AppFooter";
import GoogleButton from "components/GoogleButton";
//로그인
function Login({ children }) {
  const { dispatch } = useAppContext();
  const [filedErrors, setFiledErrors] = useState({});
  const history = useHistory();
  const location = useLocation();
  const { from: LoginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };
  // 이미 로그인된 사용자라면 홈 화면으로 이동
  const {
    store: { isAuthenticated },
  } = useAppContext();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      notification.open({
        message: "로그인 확인",
        description: " 현재 로그인 상태입니다 ",
        icon: <SmileOutlined style={{ color: "#2be37f" }} />,
      });
    }
  }, [isAuthenticated, history]);

  // 회원가입 summit 넘기면 통신 비동기처리
  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFiledErrors({});
      const data = { username, password };

      // 백앤드 통신 성공시
      try {
        const response = await axiosInstance.post("/accounts/token/", data);
        console.log("response :", response);
        const {
          data: { token: jwtToken },
        } = response;

        console.log("jwtToken ", jwtToken);
        dispatch(setToken(jwtToken));

        notification.open({
          message: "로그인 확인",
          description: "로그인되었습니다 ",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        history.push(LoginRedirectUrl);
      } catch (error) {
        //  실패시!!
        if (error) {
          notification.open({
            message: "로그인실패 ",
            description: " 아이디 / 암호를 확인해주세요",
            icon: <SmileOutlined style={{ color: "#ff4333" }} />,
          });
          const { data: fieldsErrorsMessages } = error.response;
          setFiledErrors(parseErrorMessages(fieldsErrorsMessages));

          console.log("filedErrors", filedErrors);
        }
      }
    }
    fn();
  };

  return (
    <div className="Login">
      <div className="login_header">
        <AppHeader></AppHeader>
      </div>
      <div className="login_contents">
        <Row className="contents" gutter={24}>
          <Col span={8}></Col>
          <Col span={8}>
            <Card title="로그인">
              <Form
                // {...Layout}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
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
                  {...filedErrors.username}>
                  <Input autoFocus />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  {...filedErrors.password}>
                  <Input.Password />
                </Form.Item>
                <GoogleButton/>

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

      <div className="login_footer">
        <AppFootter></AppFootter>
      </div>
    </div>
  );
}

export default Login;
