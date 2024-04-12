import { signupFields } from "../constants/formFields";

import { Input } from "./input";
import { FormAction } from "./formAction";
import { CircleCheck, CircleX } from "lucide-react";

interface SignupProps {
  isError: any | undefined;
  passwordValidationsState: string[];
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.FormEvent) => void;
}

export function Signup(props: SignupProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={props.onSubmit}>
      <div className="">
        {props.isError && (
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            <CircleX height={15} width={15} color="red" />
            {props.isError.user_exists && "Username already exists"}
            {props.isError.email_exists && "Email already exists"}
          </span>
        )}

        {signupFields.map((field) => (
          <Input
            key={field.id}
            handleChange={props.onChange}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            pattern={
              field.id === "password"
                ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                : undefined
            }
          />
        ))}

        <div className="flex flex-col gap-1.5 mt-7">
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            {props.passwordValidationsState.includes("lowerCaseOK") ? (
              <CircleCheck height={15} width={15} color="green" />
            ) : (
              <CircleX height={15} width={15} color="red" />
            )}
            At least one lowercase letter (a - z)
          </span>
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            {props.passwordValidationsState.includes("upperCaseOK") ? (
              <CircleCheck height={15} width={15} color="green" />
            ) : (
              <CircleX height={15} width={15} color="red" />
            )}
            At least one uppercase letter (A - Z)
          </span>
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            {props.passwordValidationsState.includes("numberCaseOK") ? (
              <CircleCheck height={15} width={15} color="green" />
            ) : (
              <CircleX height={15} width={15} color="red" />
            )}
            At least one numeric value (0-9)
          </span>
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            {props.passwordValidationsState.includes("specialCharOK") ? (
              <CircleCheck height={15} width={15} color="green" />
            ) : (
              <CircleX height={15} width={15} color="red" />
            )}
            At least one special symbol (!@#$%^&*=+-_)
          </span>
          <span className="dark:text-white text-gray-600 flex flex-row gap-2">
            {props.passwordValidationsState.includes("lenghtOK") ? (
              <CircleCheck height={15} width={15} color="green" />
            ) : (
              <CircleX height={15} width={15} color="red" />
            )}
            To be greater than or equal to 8 and less or equal to 16
          </span>
        </div>

        <FormAction text="Signup" />
      </div>
    </form>
  );
}
