import { userQuiz } from "../constants/formFields";
import { Input } from "./input";
import { FormAction } from "./formAction";

interface QuizProps {
  isError: any | undefined;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.FormEvent) => void;
  onFocus: () => void;
}

export function Quiz(props: QuizProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={props.onSubmit}>
      <div className="">
        {userQuiz.map((field) => (
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
            step={field.step}
            handleOnFocus={props.onFocus}
          />
        ))}

        <FormAction text="Reply" />
      </div>
    </form>
  );
}
