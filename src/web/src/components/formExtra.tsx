export function FormExtra() {
  return (
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
        <a
          href="#"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
}
