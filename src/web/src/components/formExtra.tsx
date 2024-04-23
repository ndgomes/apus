import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";

interface FormExtraProps {
  error: boolean;
}

export function FormExtra(props: FormExtraProps) {
  return (
    <>
      {props.error && (
        <span className="dark:text-white text-gray-600 flex flex-row gap-2">
          <CircleX height={15} width={15} color="red" />
          Email or Password invalid
        </span>
      )}

      <div className="flex items-center justify-center">
        <div className="text-sm">
          <Link
            to={"/forgot-password"}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </>
  );
}
