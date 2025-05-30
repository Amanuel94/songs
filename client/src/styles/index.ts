import { css } from "@emotion/react";
import "./index.css";

export const color = {
  primary: "lightblue",
  primaryLight: "#b6dcf2",
  gradient: "linear-gradient(to right, white, #b6dcf2)",
  danger: "red",
};

export const font = {
  roboto: css({
    fontFamily: '"Roboto Condensed", sans-serif;',
  }),
  lubrifont: css({
    fontFamily: '"WDXL Lubrifont TC", sans-serif',
  }),

  nunito: css({
    fontFamily: '"Nunito", sans-serif',
    fontWeight: 400,
  }),
  ancizar: css({
    fontFamily: '"Ancizar Serif", serif',
    fontWeight: 400,
  }),

  ancizarItalic: css({
    fontFamily: '"Ancizar Serif", serif',
    fontWeight: 400,
    fontStyle: "italic",
  }),
  mono: css({
    fontFamily: '"Major Mono Display", monospace',
    fontWeight: 400,
  }),
};

export const NavBarStyle = {
  self: css({
    display: "flex",
    justifyContent: "space-between",
    padding: "0 2rem",
    backgroundImage:
      "linear-gradient(to right, white," + color.primaryLight + " );",
  }),

  logo: css({
    fontSize: "2rem",
    color: color.primary,
    paddingTop: "5px",
  }),

  menubar: css({
    display: "flex",
    justifyContent: "flex-end",
    listStyle: "none",
    gap: "2rem",
    marginRight: "-40rem",
  }),

  menuItem: css({
    cursor: "pointer",
    "&:hover": {
      color: "navy",
    },
  }),

  profile: css({
    border: "3px solid #000",
    borderRadius: "50%",
    marginTop: "5px",
    width: "2rem",
    height: "2rem",
    marginLeft: "-5rem",
  }),

  profileMenu: css({
    // display: "none",
    position: "absolute",
    marginLeft: "-10px",
    marginTop: "40px",
    paddingTop:  "10px",
    padding: "10px",
    paddingRight: "20px",
    backgroundColor: color.primaryLight,
    display: "flex",
    flexDirection: "column",
    zIndex: "2",
    listStyle: "none",
    // gap: "3px",
    height: "60px",
  }),

  profileMenuItem: css({
    cursor: "pointer",
    "&:hover": {
    //   backgroundColor: "white",
      margin: "0",
      padding: "0",
      transition: "transform 0.3s ease-in-out",
    },
  }),
};

export const BannerStyle = {
  self: css({
    backgroundImage:
      "url(https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "35vh",
    backdropFilter: "blur(0.9px)", // optional: slight blur for effect
  }),

  text: css({
    color: "black",
    fontSize: "4rem",
    textAlign: "center",
    padding: "auto",
    margin: "auto",
    paddingTop: "10vh",
    backgroundColor: "rgba(255,255,255,0.8)", // transparent background for text
    display: "inline-block",
    height: "168px",
    width: "100%",
    zIndex: 2,
    // textShadow: "2px 2px grey;",
  }),

  subtext: css({
    color: "black",
    fontSize: "1.5rem",
    textAlign: "center",
    padding: "auto",
    margin: "auto",
    zIndex: 1,
    animationName: "scroll",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
  }),
};

export const cardContStyle = {
  self: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    height: "250px",
    padding: "1rem",
    backgroundImage: color.gradient,
    borderRadius: "8px",
    gap: "1rem",
    alignContent: "center",
    paddingRight: "2rem",
    paddingLeft: "2rem",
    paddingBottom: "2rem"
  }),

  card: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30%",
    height: "100%",
    padding: "0rem",
    border: "1px solid #000",
    // borderRadius: "8px",
    fontSize: "1rem",
    alignItems: "center",
    backgroundColor: "white",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  }),

  img: css({
    width: "100%",
    height: "100%",
    overflow: "hidden",
  }),

  caption: css({
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0",
    backgroundColor: "white",
    opacity: "0.7",
    position: "absolute",
    // width: "30%",
    width: "28.5%",
    // borderRadius: "8px",
  }),
};
