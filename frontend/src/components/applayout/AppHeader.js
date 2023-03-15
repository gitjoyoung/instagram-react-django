import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import GameIcon from "assets/joystick.png";
import LogoImage from "assets/logo.png";
import Search from "../Search";
import { Menu, message } from "antd";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useAppContext, deleteToken } from "store";
import "./AppHeader.scss";

export default function AppHeader() {
  const history = useHistory();
  const location = useLocation();
  const {
    dispatch,
    store: { jwtToken },
  } = useAppContext();

  const GAME_ICON = <img style={{ width: 25 }} src={GameIcon} alt="game" />;

  const getMenuItems = (jwtToken) => {
    if (jwtToken) {
      return [
        {
          label: "Profile",
          key: "/accounts/profile",
          type: "user",
          icon: null,
        },
        {
          label: "Logout",
          key: "/accounts/logout",
          type: "logout",
          icon: null,
        },
        { label: "", key: "/accounts/game", type: "game", icon: GAME_ICON },
      ];
    } else {
      return [
        { label: "Login", key: "/accounts/login", type: "user", icon: null },
        { label: "Signup", key: "/accounts/signup", type: "user", icon: null },
        { label: "", key: "/accounts/game", type: "game", icon: GAME_ICON },
      ];
    }
  };

  const [menuItems, setMenuItems] = useState(getMenuItems(jwtToken));

  useEffect(() => {
    setMenuItems(getMenuItems(jwtToken));
  }, []);

  const handleLogout = () => {
    message.success("로그아웃 되었습니다.");
    dispatch(deleteToken());
    history.push("/");
  };

  //버튼이벤트
  const handleMenuClick = (key) => {
    if (key === "/accounts/logout") {
      handleLogout();
    } else {
      history.push(key);
    }
  };

  //검색
  const handleSearch = (searchValue) => {
    history.push(`/search/${searchValue}`);
  };

  return (
    <header className="header_component">
      <h2 className="header_title">
        <Link to="/">
          <img src={LogoImage} alt="logo" width={100} />
        </Link>
      </h2>
      <div className="header_search">
        <Search onSearch={handleSearch} />
      </div>
      <div className="header_menu">
        <Menu
          style={{ justifyContent: "right", borderBottom: "none" }}
          onClick={(item) => {
            handleMenuClick(item.key);
          }}
          items={menuItems}
          mode="horizontal"
          selectedKeys={[location.pathname]}></Menu>
      </div>
    </header>
  );
}
