import { loginFields } from "../constants/formFields";
import { Input } from "./input";
import { FormExtra } from "./formExtra";
import { FormAction } from "./formAction";

interface LoginProps {
  isError: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.FormEvent) => void;
  onFocus: () => void;
}

export function Login(props: LoginProps) {
  return (
    <form onSubmit={props.onSubmit} className="mt-8 space-y-6">
      {loginFields.map((field) => (
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
          handleOnFocus={props.onFocus}
        />
      ))}

      <FormExtra error={props.isError} />
      <FormAction text="Login" />
    </form>
  );
}
