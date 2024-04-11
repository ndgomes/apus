import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardPage, LoginPage, SignupPage } from "./pages";
import { Moon, Sun } from "lucide-react";
import { AuthProvider } from "./context/authContext";
import RequireAuth from "./utils/requiredAuth";

export function App() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>

      <button
        className="absolute bottom-8 right-8 border-2 rounded-lg p-2.5 border-purple-600 hover:border-purple-500"
        onClick={() => darkModeHandler()}
      >
        {!dark && <Sun color="white" fill="white" />}
        {dark && <Moon color="black" fill="black" />}
      </button>
    </>
  );
}
