import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
// import video from "assets/running_jump.mp4";
import ReactPlayer from "react-player";

export default function NotFound() {
  console.log("404 error");
  return (
    <>
      <Row justify="center">
        <Col span={8} align="middle">
          <h1>error page 404</h1>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={8} align="middle">
          <ReactPlayer
            // url={video}
            width="320"
            height="240"
            playing={true}
            muted={true}
            controls={false}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={8} align="middle">
          <Link to="/">홈으로</Link>
        </Col>
      </Row>
    </>
  );
}
