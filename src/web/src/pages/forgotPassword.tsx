import { useState } from "react";
import { FormAction, Header, Input } from "../components";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleOnChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
  };

  const handleOnSubmit = () => {
    console.log(email);
    navigate("/login");
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Forgot your password?"
          paragraph="We will send a new password to your email. "
          linkName="Back to Login"
          linkUrl="/"
        />

        <form onSubmit={handleOnSubmit} className="mt-8 space-y-6">
          <Input
            key={1}
            handleChange={handleOnChange}
            labelText={"Email address"}
            labelFor={"email"}
            id={"email"}
            name={"email"}
            type={"email"}
            isRequired={true}
            placeholder={"Email address"}
          />

          <FormAction text="Request new password" />
        </form>
      </div>
    </div>
  );
}
