import { Avatar, Card } from "antd";
import AppFootter from "components/applayout/AppFooter";
import AppHeader from "components/applayout/AppHeader";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "store";
import { useAxios } from "utils/api";
import Post from "components/Post";
import "./Profile.scss";

function Profile({ props }) {
  const history = useHistory();
  const [profileData, setProfileData] = useState(null);
  const [postList, setPostList] = useState(null);


  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: response, loading, error }, refetch] = useAxios({
    url: "/accounts/profile/",
    headers,
  });
  console.log(response)

  useEffect(() => {
    if (response) {
      setProfileData(response);
      setPostList(response.posts)
    }
  
  }, [response]);

  if (loading || !profileData ) {
    return <div>Loading...</div>;
  }

  console.log(postList);
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
      <div className="profile_mypost">
        {postList &&
          postList.map((post) => ( 
            <div className="mypost_item" key={"item" + post.id}>
              <Post key={post.id} post={post} />
            </div>
          ))}
      </div>
      <div className="Profile_footer">
        <AppFootter></AppFootter>
      </div>
    </div>
  );
}

export default Profile;
