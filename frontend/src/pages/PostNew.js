import PostNewForm from "components/PostNewForm";
import React from "react";
import "./PostNew.scss";
import { Card } from "antd";
import AppHeader from "components/applayout/AppHeader";

export default function PostNew() {
  return (
    <>
      <AppHeader />
        <div className="PostNew">
          <Card title="새포스팅 쓰기">
            <PostNewForm></PostNewForm>
          </Card>
        </div>
    </>
  );
}
