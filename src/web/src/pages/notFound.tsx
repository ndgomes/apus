import { Header } from "../components";

export function NotFoundPage() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Page not found!"
          paragraph="To access this page you need to login first. "
          linkName="Login"
          linkUrl="/login"
        />
      </div>
    </div>
  );
}
