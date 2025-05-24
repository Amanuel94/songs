/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { font, NavBarStyle } from "styles";

const NavBar = () => {


  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <div css={NavBarStyle.self}>
      <div css={[font.lubrifont, NavBarStyle.logo]}>Matalog</div>
      <ul css={[NavBarStyle.menubar, font.lubrifont]}>
        <li css={NavBarStyle.menuItem}>
          <a>Home</a>
        </li>
        <li css={NavBarStyle.menuItem}>
          <a>Browse</a>
        </li>
        <li css={NavBarStyle.menuItem}>
          <a>Register</a>
        </li>
        <li css={NavBarStyle.menuItem}>
          <a>Login</a>
        </li>
        <li css={NavBarStyle.menuItem}>
          <a>About</a>
        </li>
      </ul>
      <div css={[NavBarStyle.profile, font.lubrifont]} onClick={() => setProfileMenu(!profileMenu)}>
        <ul css={NavBarStyle.profileMenu} style={{ display: profileMenu ? "flex" : "none" }}>
          <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>Register <hr/></li>
          <li css={[NavBarStyle.menuItem, NavBarStyle.profileMenuItem]}>Login</li>
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
