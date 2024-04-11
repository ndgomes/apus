import { Header, Login } from "../components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Loading } from "../components/loading";

export function LoginPage() {
  let navigate = useNavigate();

  const { setAuthToken, setUser, setLoading } = useContext(AuthContext);

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
          setLoading(true);
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
    <>
      {loadingState ? (
        <Loading />
      ) : (
        <>
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login
            isError={errorState}
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
          />
        </>
      )}
    </>
  );
}
