import { Card, Form, Avatar } from "antd";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
    async function fetchUserData() {
      try {
        const response = await axiosInstance.get(
          "/accounts/profile/",{headers}
        );
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);
  if (!profileData) {
    return <div>Loading...</div>;
  }
  console.log("profileData",profileData)
  return (
    <div className="Profile">
      <div className="Profile_header"></div>
      <div className="Profile_contents">
        <Card>
          <Form align="center">
            <Form.Item>
              <Avatar
                size="large"
                icon={<img src={profileData.avatar_url} alt={"유저아이디"} />}
              />
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>닉네임 : {profileData.username}</Link>
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>작성글수 : {profileData.post_count}</Link>
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>팔로잉 : {profileData.following_count}</Link>
            </Form.Item>
            <Form.Item>
              <Link to={"/"}>팔로워 : {profileData.follower_count}</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
