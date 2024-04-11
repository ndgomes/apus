import { signupFields } from "../constants/formFields";

import { Input } from "./input";
import { FormAction } from "./formAction";

interface SignupProps {
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.FormEvent) => void;
}

export function Signup(props: SignupProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={props.onSubmit}>
      <div className="">
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
          />
        ))}

        <FormAction text="Signup" />
      </div>
    </form>
  );
}
