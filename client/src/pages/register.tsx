/** @jsxImportSource @emotion/react */

import InputField from "../components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { APIFetchStatus, IRegistrationFormInput } from "@types";
import { formStyles } from "styles/form";
import { color, font } from "styles";
import { authActions } from "features/authSlice";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "components/Loading";

const RegisterForm = () => {
  const { handleSubmit, control } = useForm<IRegistrationFormInput>({
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {}, [authState]);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IRegistrationFormInput> = (
    data: IRegistrationFormInput
  ) => {
    const registerAction = authActions.register({
      req: {
        username: data.username,
        password: data.password,
      },
    });
    dispatch(registerAction);
  };

  if (authState.status === APIFetchStatus.SUCCESS) {
    alert("Registration successful! You can now log in.");
    navigate("/");
  } else if (authState.status === APIFetchStatus.ERROR) {
    alert(authState.error);
    console.log("Error:", authState.error);
  }

  return (
    <>
      {authState.status === APIFetchStatus.PENDING && (
        <Loading/>
      )}
      <div
        css={{
          width: "100%",
          height: "100vh",
          backgroundImage: color.gradient,
          paddingTop: "2rem",
        }}
      >
        <div css={[formStyles.self, font.lubrifont, { height: "70vh" }]}>
          <h1> Create an Account </h1>
          <hr css={[formStyles.separator]} />
          <form css={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Enter Username"
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
              label="Enter Password"
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

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              control={control}
              rules={{
                required: "This field is required",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              }}
              placeholder="Confirm Password"
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
              <Link to="/login">Aleady have an account</Link> ?
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
    </>
  );
};

export default RegisterForm;
