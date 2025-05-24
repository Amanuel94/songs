/** @jsxImportSource @emotion/react */

import { font } from "styles";

// import React from "react";

const Footer = () => {
  return (
    <div
      css={{
        backgroundColor: "#282c34",
        padding: "20px",
        textAlign: "center",
        color: "white",
        // marginTop: "20px",

      }}
    >
      <p css={font.ancizarItalic}>© 2025 Amanuel Tewodros Getachew. All rights reserved.</p>
    </div>
  );
};

export default Footer;
