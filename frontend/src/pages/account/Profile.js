import { Card, Form, Avatar, Menu } from "antd";
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

  console.log("response",response)
  let items = null;
  if (profileData) {
    items = [
      {
        label: "Avtar",
        key: "avtar",
        icon: (
          <Avatar
            size="large"
            icon={<img src={profileData.avatar_url} alt={"유저아이디"} />}
          />
        ),
      },
      {
        label: <Link to={"/"}>닉네임 : {profileData.username}</Link>,
        key: "nick",
      },
      {
        label: <Link to={"/"}>작성글수 : {profileData.post_count}</Link>,
        key: "caption",
      },
      {
        label: <Link to={"/"}>팔로잉 : {profileData.followings_count}</Link>,
        key: "pllowing",
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
      <div className="Profile_header"></div>
      <div className="Profile_contents">
        <Card><Menu mode="horizontal" items={items}/></Card>
      </div>
    </div>
  );
}

export default Profile;