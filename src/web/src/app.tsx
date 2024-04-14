import { Routes, Route } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  NotFoundPage,
  QuizPage,
  SignupPage,
} from "./pages";
import { AuthProvider } from "./context/authContext";
import RequireAuth from "./utils/requiredAuth";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
