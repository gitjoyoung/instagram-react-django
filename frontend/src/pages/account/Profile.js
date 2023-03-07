import { Card, Form, Avatar } from "antd";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect ,useHistory } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "store";
import { axiosInstance } from "utils/api";
import "./Profile.scss";

function Profile({ props }) {

  const history = useHistory();
  const [profileData, setProfileData] = useState(null);
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };


  useEffect(() => {
    if (!props.username) {
      history.push("/404");
      return;
    }
    async function fetchProfileData() {
      try {
        const response = await axiosInstance.get(
          `https://example.com/api/profile?username=${props.username}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Profile">
      <div className="Profile_header">
        <AppHeader></AppHeader>
      </div>
      <div className="Profile_contents">
        <Card>
          <Form align="center">
            <Form.Item>
              <Avatar
                size="large"
                icon={<img src={"avatar_url"} alt={"유저아이디"} />}
              />
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>닉네임 : {"닉네임"}</Link>
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>글작성수 : {"글갯수"}</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
