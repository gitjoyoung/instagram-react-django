import { Card, Form, Avatar, Menu } from "antd";
import AppFootter from "components/applayout/AppFooter";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "store";
import { axiosInstance, useAxios } from "utils/api";
import "./Profile.scss";

function Profile({ props }) {
  const history = useHistory();
  const [profileData, setProfileData] = useState(null);
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: response, loading, error }, refetch] = useAxios({
    url: "/accounts/profile/",
    headers,
  });

  useEffect(() => {
    if (response) {
      setProfileData(response);
    }
  }, [response]);

  console.log("response", response);
  let items = null;
  if (profileData) {
    items = [
      {
        label: profileData.username,
        key: "avtar",
        icon: (
          <Avatar
            size={{ xxl: 200 }}
            icon={<img src={profileData.avatar_url} alt={"유저아이디"}></img>}
          />
        ),
      },
      {
        label: (
          <Link to={`/search/${profileData.username}`}>
            Feed : {profileData.post_count}
          </Link>
        ),
        key: "caption",
      },

      {
        label: <Link to={"/"}>팔로잉 : {profileData.followings_count}</Link>,
        key: "followings_count",
      },
      {
        label: <Link to={"/"}>팔로워 : {profileData.followers_count}</Link>,
        key: "followers_count",
      },
    ];
  }

  return (
    <div className="Profile">
      <div className="Profile_header">
        <AppHeader></AppHeader>
      </div>

      <div className="Profile_contents">

        <Card title="profile 페이지!">
          <Menu
            mode="horizontal"
            items={items}
          />
        </Card>
        <Card>
          <p>뭐를 보여줄까요?</p>
        </Card>
      </div>
      <div className="Profile_footer">
        <AppFootter></AppFootter>
      </div>
    </div>
  );
}

export default Profile;
