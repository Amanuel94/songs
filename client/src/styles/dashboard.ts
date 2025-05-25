import { css } from "@emotion/react";
import { color } from "styles";

export const dashboardStyles = {
  self: css({
    display: "flex",
    flexDirection: "column",
    minHeight: "80%",
    border: "2px solid black",
    width: "80%",
    margin: "auto",
    // backgroundColor: "white",
    borderRadius: "20px 20px 20px 20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "80%",
    padding: "0rem",
    backgroundColor: color.primary,
  }),
  nav: css({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    padding: "0",
    maxHeight: "10%",
    backgroundColor: "white",
    borderRadius: "20px 20px 0px 0px",
    borderBottom: "1px solid black",
  }),
  btn: css({
    padding: "10px 20px",
    margin: "0",
    fontSize: "1rem",
    color: "black",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "2px solid black",
    marginBottom: "-1px",
    zIndex: 1,
    "&:hover": {
      borderBottom: "2px solid " + color.primary,
      backgroundColor: color.primary,
    },
  }),

  stage: css({
    width: "80%",
    minHeight: "90%",
    padding: "2rem",

    // border: "1px solid #ccc",
  }),
};

export const songCardStyles = {
  self: css({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "left",
    width: "60%",
    marginLeft: "10px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    paddingLeft: "1rem",
    paddingBottom: ".4rem",
  }),

  title: css({
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "0rem",
    marginTop: "5px",
  }),
  list: css({
    listStyleType: "none",
    paddingLeft: "0",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    textSize: "3px",
    width: "100%",
    maxHeight: "10px",
  }),
  listItem: css({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "0.7rem",
    padding: "0rem",
    margin: "0rem",
  }),
  icon: css({
    width: 15,
    height: 15,
    verticalAlign: "middle",
    marginRight: 8,
    marginTop: "4px",
  }),

  micro: {
    fontSize: "0.8rem",
    color: "black",
    marginLeft: "0px",
    marginTop: "4px",
    padding: "0px",
    width: "70px",
    textOverflow: "ellipsis",
  },

  btns: css({
    display: "inline",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: "10px",
  }),

  btn: css({
    backgroundColor: "white",
    cursor: "pointer",
    padding: "0.5rem",
    marginLeft: "0.5rem",
    border: "1px solid black",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    marginTop: "-13px",

    "&:hover": {
      backgroundColor: color.primary,
    },
  }),
};

export const songFilterStyles = {
  self: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    width: "100%",
    justifyContent: "left",
    gap: "10px",
    marginLeft: "10px",
  }),

  input: css({
    padding: "0.5rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    width: "60%",
    height: "20px",
    borderColor: "black",
    "&:focus": {
      borderColor: color.primary,
      borderShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
      outline: "none",
    },
  }),

  select: css({
    padding: "0.5rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    // width: "20%",
    fontSize: "0.8rem",
    // paddingTop: "0.2rem",
    height: "35px",
    borderColor: "black",
    margin: "0rem",
    backgroundImage: color.gradient,
    "&:focus": {
      borderColor: color.primary,
      borderShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
      // outline: "none",
    },
  }),
  selectContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "20%",
    padding: "0rem",
    marginTop: "-0.7rem",
  }),

  selectLabel: css({
    margin: "0rem",
    marginBottom: "0rem",
    marginLeft: "0.4rem",
    fontSize: "0.7rem",
    color: "black",
  }),

  btn: css({
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    border: "1px solid black",
    cursor: "pointer",
    fontSize: "0.8rem",
    backgroundColor: "white",
    "&:active": {
      boxShadow: "0 0 0 1px gray",
    },
  }),

  results: css({
    marginTop: "1rem",
    marginLeft: "10px",
  }),

  pagination: css({
    width: "100%",
    margin: "auto",
    justifyContent: "space-between",

  }),

  pageBtn: css({
    borderRadius: "10px",
    margin: "0.5rem",
    background: "transparent"
  })

};
