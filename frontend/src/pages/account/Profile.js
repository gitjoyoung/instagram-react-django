import { Avatar, Card } from "antd";
import AppFootter from "components/applayout/AppFooter";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "store";
import { useAxios } from "utils/api";
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

  if (loading || !profileData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching profile data</div>;
  }
  console.log(response);
  return (
    <div className="Profile">
      <div className="Profile_header">
        <AppHeader></AppHeader>
      </div>

      <div className="Profile_contents">
        <div className="profile_avatar">
          <Avatar
            size={160}
            src={profileData.avatar_url}
            alt={profileData.username}></Avatar>
        </div>
        <div className="profile_username">
          <h1>{profileData.username} </h1>
        </div>
        <div className="profile_detail">
          <div className="detail_item">
            <Link to={"/"}>게시물 : {profileData.post_count}</Link>
          </div>
          <div className="detail_item">
            <Link to={"/"}>팔로워 : {profileData.followers_count}</Link>
          </div>
          <div className="detail_item">
            <Link to={"/"}>팔로윙 : {profileData.followings_count}</Link>
          </div>
        </div>
      </div>
      <div className="profile_mypost">포스트ㅁㄴㅇㅁㄴㅇ 내용들</div>
      <div className="Profile_footer">
        <AppFootter></AppFootter>
      </div>
    </div>
  );
}

export default Profile;
