import React, { useEffect, useState } from "react";
import "./SuggestionList.scss";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import { axiosInstance, useAxios } from "utils/api";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originUserList, loading, error }, refetch] = useAxios({
    url: "accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    console.log("originUserList", originUserList);
    if (!originUserList) setUserList([]);
    else {
      const slicedUserList = originUserList.slice(0, 10);
      setUserList(
        slicedUserList.map((user) => ({ ...user, is_follow: false }))
      );
    }
  }, [originUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const config = { headers };
    axiosInstance
      .post("accounts/follow/", data, config)

      .then((response) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={style}>
      {loading && <div> loading...</div>}
      {error && <div> error ....</div>}

      <Card title="follow" size="small">
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
          />
        ))}
      </Card>
    </div>
  );
}
