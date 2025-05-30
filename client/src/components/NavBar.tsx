/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { client } from "api/axios";
import { useAppSelector } from "hooks/stateHooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { font, NavBarStyle } from "styles";

const NavBar = () => {

  const authState = useAppSelector((state) => state.auth);
  client.setAuthToken(authState.accessToken)
  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <div css={NavBarStyle.self}>
      <div css={[font.lubrifont, NavBarStyle.logo]}>Matalog</div>
      <ul css={[NavBarStyle.menubar, font.lubrifont]}>
        <li css={NavBarStyle.menuItem}>
          <Link to="/" css={{ textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li css={NavBarStyle.menuItem}>
          <Link to="/dashboard" css={{ textDecoration: "none" }}>
            Browse
          </Link>
        </li>
        <li css={NavBarStyle.menuItem}>
          <Link to="/" css={{ textDecoration: "none" }}>
            About
          </Link>
        </li>
        {authState.isAuthenticated ? (
          <>
            <li css={NavBarStyle.menuItem}>
              <Link to="/logout" css={{ textDecoration: "none" }}>
                Logout
              </Link>
            </li>
            <li css={NavBarStyle.menuItem}>
              <Link to="/logout" css={[{ textDecoration: "none" }]}>
                {authState.user.username}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li css={NavBarStyle.menuItem}>
              <Link to="/register" css={{ textDecoration: "none" }}>
                Register
              </Link>
            </li>
            <li css={NavBarStyle.menuItem}>
              <Link to="/login" css={{ textDecoration: "none" }}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
      <div
        css={[NavBarStyle.profile, font.lubrifont]}
        onClick={() => setProfileMenu(!profileMenu)}
      >
        <ul
          css={[NavBarStyle.profileMenu, {minWidth: "150px"}]}
          style={{ display: profileMenu ? "flex" : "none" }}
        >
          {authState.isAuthenticated ? (
            <>
              <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>
                <Link to="/logout">Logout</Link>
                <hr />
              </li>
              <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>
                <span>{authState.user.username}</span>
              </li>
            </>
          ) : (
            <>
              <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>
                <Link to="/register">Register</Link>
                <hr />
              </li>
              <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          css={[
            css({ width: "100%", height: "100%", margin: "0 auto" }),
            NavBarStyle.menuItem,
          ]}
        >
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </svg>
      </div>
    </div>
  );
};

export default NavBar;
