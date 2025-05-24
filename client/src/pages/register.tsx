import React from "react";
import InputField from "../components/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "@types";

const RegisterForm = () => {
 
  const { handleSubmit, control } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data:IFormInput) => console.log(data);

  return (
    <div>
      <h1> Create an Account </h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField 
            label="Enter Username" 
            type="text" 
            name="username" 
            control= {control}
            rules={{ required: true }}
            placeholder="Username"
            />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
