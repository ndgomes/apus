import { Header, Login } from "../components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";

export function LoginPage() {
  const { setAuthToken, setUser, getConfiguration } = useContext(AuthContext);

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

  const handleOnSubmit = (event: React.FormEvent) => {
    if (email && password) {
      event.preventDefault();
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
          getConfiguration(token);
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
