import { useState } from "react";
import { loginFields } from "../constants/formFields";
import { Input } from "./input";
import { FormExtra } from "./formExtra";
import { FormAction } from "./formAction";

export function Login() {
  let fieldsState = {};
  loginFields.forEach((field) => (fieldsState[field.id] = ""));

  const [loginState, setLoginState] = useState(fieldsState);

  const handleOnChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = () => {};

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {loginFields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleOnChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction onSubmit={handleOnSubmit} text="Login" />
    </form>
  );
}
