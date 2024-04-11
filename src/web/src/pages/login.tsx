import { Header, Login } from "../components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Loading } from "../components/loading";

export function LoginPage() {
  let navigate = useNavigate();

  const { setAuthToken, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    setErrorState(false);
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleOnFocus = () => {
    setErrorState(false);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    if (email && password) {
      e.preventDefault();
      setLoadingState(true);

      axios
        .post("https://api.apu-s.space/login", {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.access_token;

          setAuthToken(token);
          setUser(jwtDecode(token));
          localStorage.setItem("authToken", JSON.stringify(token));
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorState(true);
        })
        .finally(() => {
          setLoadingState(false);
        });
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
          isLoading={loadingState}
        />
        {!loadingState && (
          <Login
            isError={errorState}
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
          />
        )}
      </div>
    </div>
  );
}
