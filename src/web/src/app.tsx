import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage } from "./pages";
import { Moon, Sun } from "lucide-react";

export function App() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>

        <button
          className="absolute bottom-8 right-8 border-2 rounded-lg p-2.5 border-purple-600 hover:border-purple-500"
          onClick={() => darkModeHandler()}
        >
          {!dark && <Sun color="white" fill="white" />}
          {dark && <Moon color="black" fill="black" />}
        </button>
      </div>
    </div>
  );
}
