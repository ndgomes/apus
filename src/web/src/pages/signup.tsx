import { useState } from "react";
import { Header, Signup } from "../components";
import { signupFields } from "../constants/formFields";

export function SignupPage() {
  let fieldsState = {};
  signupFields.forEach((field) => (fieldsState[field.id] = ""));
  const [signupState, setSignupState] = useState(fieldsState);

  const handleOnChange = (e: any) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(signupState);
    // createAccount();
  };

  return (
    <>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup onSubmit={handleOnSubmit} onChange={handleOnChange} />
    </>
  );
}
