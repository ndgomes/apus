import { Link } from "react-router-dom";
import { Loading } from "./loading";
import apusLogo from "../assets/apusLogo.png";

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
  isLoading?: boolean;
}

export function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
  isLoading,
}: HeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-14 w-14" src={apusLogo} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {heading}
          </h2>
          <p className="text-center text-sm text-gray-600 mt-5 dark:text-white">
            {paragraph}{" "}
            <Link
              to={linkUrl}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              {linkName}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
