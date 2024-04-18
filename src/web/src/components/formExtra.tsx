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

      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 accent-purple-600"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900 dark:text-white"
          >
            Remember me
          </label>
        </div>

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
