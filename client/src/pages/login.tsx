/** @jsxImportSource @emotion/react */

import InputField from "../components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "@types";
import { formStyles } from "styles/form";
import { color, font } from "styles";

const LoginForm = () => {
  const { handleSubmit, control } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    console.log(data);

  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundImage: color.gradient,
        paddingTop: "2rem",
      }}
    >
      <div css={[formStyles.self, font.lubrifont, {height: "60vh"}]}>
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
            <a href="#">New here? Create an account</a> ?
          </p>

          <input
            type="submit"
            value="Submit"
            css={[formStyles.btn, font.lubrifont]}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
