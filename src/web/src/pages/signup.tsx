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
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <Signup onSubmit={handleOnSubmit} onChange={handleOnChange} />
      </div>
    </div>
  );
}
