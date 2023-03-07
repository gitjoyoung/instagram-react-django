import { Card, Form, Avatar } from "antd";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "store";
import { axiosInstance ,useAxios } from "utils/api";
import "./Profile.scss";

function Profile({ props }) {
  const history = useHistory();
  const [profileData, setProfileData] = useState(null);
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };


  const [{ data: response, loading, error }, refetch] = useAxios({
    url: "/api/profile/",
  });

  if(!response){
    setProfileData(response.data);
    console.log("profileData",profileData)
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // const items = [
  //   {
  //     label: "Avtar",
  //     key: "avtar",
  //     icon: (
  //       <Avatar
  //         size="large"
  //         icon={<img src={profileData.avatar_url} alt={"유저아이디"} />}
  //       />
  //     ),
  //   },
  //   {
  //     label: <Link to={"/"}>닉네임 : {profileData.username}</Link>,
  //     key: "nick",
  //   },
  //   {
  //     label: <Link to={"/"}>작성글수 : {profileData.post_count}</Link>,
  //     key: "caption",
  //   },
  //   {
  //     label: <Link to={"/"}>팔로잉 : {profileData.following_count}</Link>,
  //     key: "pllowing",
  //   },
  //   {
  //     label: <Link to={"/"}>팔로워 : {profileData.follower_count}</Link>,
  //     key: "app",
  //   },
  // ];
  console.log("profileData", profileData);
  return (
    <div className="Profile">
      <div className="Profile_header"></div>
      <div className="Profile_contents">
        <Card>
          <Form align="center">
         
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
