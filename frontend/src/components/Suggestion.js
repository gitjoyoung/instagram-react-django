import React from "react";
import { Button, Avatar, Switch,Space } from "antd";
import "./Suggestion.scss";

export default function Suggestion({
  suggestionUser,
  onFollowUser,
  unFollowUser,
}) {
  const { username, name, avatar_url, is_follow } = suggestionUser;
  const handleToggleFollow = () => {
    if (is_follow) {
      unFollowUser(username);
    } else {
      onFollowUser(username);
    }
  };

  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar
          size="small"
          icon={<img src={avatar_url} alt={`${username}'s avatar`} />}
        />
        {/* <UserOutlined /> */}
      </div>
      <div className="username">{name.length === 0 ? username : name}</div>
      <div className="action">
        <Space direction="vertical">
          <Switch size="small" checked={is_follow} onChange={handleToggleFollow} />
        </Space>
      </div>
    </div>
  );
}
