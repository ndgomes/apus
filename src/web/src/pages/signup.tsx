import { useState } from "react";
import { Header, Signup } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  let navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [validationPatternState, setValidationsPatternState] = useState<
    string[]
  >([]);
  const [error, setError] = useState();

  const validationPasswordPattern = (password: string) => {
    const validations: string[] = [];

    if (password.match(/[a-z]/g)) {
      validations.push("lowerCaseOK");
    } else {
      const findErrorIndex = validations.indexOf("lowerCaseOK");
      if (findErrorIndex !== -1) {
        validations.splice(findErrorIndex, 1);
      }
    }

    if (password.match(/[A-Z]/g)) {
      validations.push("upperCaseOK");
    } else {
      const findErrorIndex = validations.indexOf("upperCaseOK");
      if (findErrorIndex !== -1) {
        validations.splice(findErrorIndex, 1);
      }
    }

    if (password.match(/[0-9]/g)) {
      validations.push("numberCaseOK");
    } else {
      const findErrorIndex = validations.indexOf("numberCaseOK");
      if (findErrorIndex !== -1) {
        validations.splice(findErrorIndex, 1);
      }
    }

    if (password.match(/[!@#$%^&*_=+-]/g)) {
      validations.push("specialCharOK");
    } else {
      const findErrorIndex = validations.indexOf("specialCharOK");
      if (findErrorIndex !== -1) {
        validations.splice(findErrorIndex, 1);
      }
    }

    if (password.match(/.{8,16}/)) {
      validations.push("lenghtOK");
    } else {
      const findErrorIndex = validations.indexOf("lenghtOK");
      if (findErrorIndex !== -1) {
        validations.splice(findErrorIndex, 1);
      }
    }

    return setValidationsPatternState(validations);
  };

  const handleOnChange = (e: any) => {
    setError(undefined);
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "password") {
      setPassword(value);
      setValidationsPatternState((prevValidations) => {
        validationPasswordPattern(value);
        return prevValidations;
      });
    }
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    if (validationPatternState.length === 5) {
      event.preventDefault();
      setLoadingState(true);

      axios
        .post("https://api.apu-s.space/signup", {
          username,
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          setError(undefined);
          setValidationsPatternState([]);
          navigate("/");
        })
        .catch((error) => {
          setError(error.response.data.detail);
          setValidationsPatternState([]);
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
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
          isLoading={loadingState}
        />
        {!loadingState && (
          <Signup
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            passwordValidationsState={validationPatternState}
            isError={error}
          />
        )}
      </div>
    </div>
  );
}
