import { css } from "@emotion/react";
import { color } from "styles";

export const formStyles = {

    self: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
        height: "90vh",
        border: "1px solid #ccc",
        backgroundColor: "white",
        margin: "auto",
        padding: "1rem",
       
    }),

    title: css({
        fontSize: "2rem",
        textAlign: "center",
    }),

    form: css({
        display: "flex",
        flexDirection: "column",
        width: "80%",
        gap: ".5rem",
        alignItems: "left",
    }),

    separator: css({
        width: "80%",
        height: "1px",
        backgroundColor: color.primary,
        margin: "1rem 0",
    }),

    inputContainer: css({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "1rem",
    }),

    field: css({
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        fontSize: "1rem",
        height: "1em",
        marginBottom: "0rem",
        "&:focus": {
            borderColor: color.primary,
            outline: "none",
        },
    }),

    btn: css({
        width: "70px",
        padding: "0.5rem",
        backgroundColor: color.primary,
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        cursor: "pointer",
        margin: "0",
        alignSelf: "center",
    }),

    danger: css({
        color: color.danger,
        fontSize: "0.8rem",
        marginTop: "0",
        marginBottom: "0",
    }),

}