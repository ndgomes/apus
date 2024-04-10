import { useState } from "react";
import { signupFields } from "../constants/formFields";

import { Input } from "./input";
import { FormAction } from "./formAction";

export function Signup() {
  let fieldsState = {};
  signupFields.forEach((field) => (fieldsState[field.id] = ""));
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: any) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = () => {};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {signupFields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction onSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
