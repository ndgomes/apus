import { useContext, useState } from "react";
import { loginFields } from "../constants/formFields";
import { Input } from "./input";
import { FormExtra } from "./formExtra";
import { FormAction } from "./formAction";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Loading } from "./loading";

export function Login() {
  let navigate = useNavigate();

  const { setAuthToken, setUser, setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    setError(false);
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    if (email && password) {
      e.preventDefault();
      setLoadingScreen(true);

      axios
        .post("https://api.apu-s.space/login", {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.access_token;
          console.log(token);
          setAuthToken(token);
          setUser(jwtDecode(token));
          localStorage.setItem("authToken", JSON.stringify(token));
          navigate("/dashboard");
          setLoading(true);
        })
        .catch((error) => {
          console.log(error.message);
          if (error.message) {
            setError(true);
          }
        })
        .finally(() => {
          setLoadingScreen(false);
        });
    }
  };

  return (
    <>
      {loadingScreen ? (
        <Loading />
      ) : (
        <form onSubmit={handleOnSubmit} className="mt-8 space-y-6">
          {loginFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleOnChange}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              handleOnFocus={() => setError(false)}
            />
          ))}

          <FormExtra error={error} />
          <FormAction text="Login" />
        </form>
      )}
    </>
  );
}
