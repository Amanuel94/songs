import { InputFieldProp, IFormInput } from "@types";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type AllInputFieldProps = InputFieldProp & UseControllerProps<IFormInput>;

const InputField: React.FC<AllInputFieldProps> = (
  props: AllInputFieldProps
) => {
  const { label, type, placeholder, required, name, ...controllerProps } =
    props;
  const { field, fieldState } = useController({ name, ...controllerProps });

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
        {...field}
      />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  );
};

export default InputField;
