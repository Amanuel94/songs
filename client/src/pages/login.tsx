/** @jsxImportSource @emotion/react */

import InputField from "../components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { APIFetchStatus, IFormInput } from "@types";
import { formStyles } from "styles/form";
import { color, font } from "styles";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { useEffect } from "react";
import { authActions } from "features/authSlice";

const LoginForm = () => {
  const { handleSubmit, control } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {}, [authState]);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = (
    data: IFormInput
  ) => {
    const registerAction = authActions.login({
      req: {
        username: data.username,
        password: data.password,
      },
    });
    dispatch(registerAction);
  };

  if (authState.status === APIFetchStatus.SUCCESS) {
    alert("Login successful!");
    navigate("/");
  } else if (authState.status === APIFetchStatus.ERROR) {
    alert(authState.error);
    console.log("Error:", authState.error);
  }
  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundImage: color.gradient,
        paddingTop: "2rem",
      }}
    >
      <div css={[formStyles.self, font.lubrifont, { height: "60vh" }]}>
        <h1> Log In </h1>
        <hr css={[formStyles.separator]} />
        <form css={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Username"
            type="text"
            name="username"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must not exceed 20 characters",
              },
            }}
            placeholder="Username"
            required={true}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            placeholder="Password"
            required={true}
          />
          <p
            css={[
              {
                marginRight: "0rem",
                color: "navy",
                fontSize: ".9rem",
                marginTop: "0rem",
                textAlign: "right",
              },
              font.ancizarItalic,
            ]}
          >
            {" "}
            <Link to="/register">New here? Create an account</Link> ?
          </p>

          <input
            type="submit"
            value="Submit"
            css={[formStyles.btn, font.lubrifont]}
          />
          <Link to="/" css={[font.lubrifont, { marginLeft: "1rem" }]}>
            {" "}
            &lt; Go Home{" "}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
