/** @jsxImportSource @emotion/react */
import { IGenericFormInput, InputFieldProp } from "@types";
import { useRef } from "react";
// import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { formStyles } from "styles/form";


function InputField<T extends IGenericFormInput>(
    props: InputFieldProp & UseControllerProps<T>
) {
    const { label, type, placeholder, required, name, value, ...controllerProps } = props;
    const { field, fieldState } = useController({ name, ...controllerProps });
    
    const val = useRef<string>(value)
    if (value !== undefined) {
        field.value = val.current as typeof field.value;
    }

    return (
    <div css={formStyles.inputContainer}>
        <label htmlFor={name}>
          {required && <span css={{ color: "red" }}>*</span>} {label}
        </label>

        <br />
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          required={required}
          {...field}
            value={field.value|| ""}
            autoComplete="off"
            css={formStyles.field}
            onFocus={(e) => {
            field.onChange(e);
            }}

            onChange={(e) => {
            field.onChange(e);
            val.current = e.target.value;
          }}
        />
        <p
          css={[
            formStyles.danger,
            { visibility: fieldState.error ? "visible" : "hidden" },
          ]}
        >
          {" "}
          {fieldState.error?.message}{" "}
        </p>
      </div>
    );
};

export default InputField;
