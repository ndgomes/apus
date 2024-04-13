import { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { userConfigInterface } from "../pages";
import { useNavigate } from "react-router-dom";

interface CurrentUserContextType {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string | undefined>>;

  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;

  userConfig: userConfigInterface | undefined;

  firstTime: boolean;

  clearStates(): void;

  callLogout: () => void;
  getConfiguration: (authTokenProp?: string) => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  let navigate = useNavigate();

  let [authToken, setAuthToken] = useState<string | undefined>(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken") || "")
      : undefined
  );

  let [user, setUser] = useState<string | undefined>(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken") || "")
      : undefined
  );

  const [userConfig, setUserConfig] = useState<
    userConfigInterface | undefined
  >();

  let [firstTime, setFirstTime] = useState<boolean>(false);

  //Clear all states
  function clearStates() {
    setAuthToken(undefined);
    setUser(undefined);
    setUserConfig(undefined);
    setFirstTime(false);
    localStorage.removeItem("authToken");
  }

  //Call logout
  function callLogout() {
    clearStates();

    axios
      .post(
        "https://api.apu-s.space/logout",
        {},
        { headers: { token: authToken } }
      )
      .then(function () {
        setAuthToken(undefined);
        setUser(undefined);
        localStorage.removeItem("authToken");
      })
      .catch(function (error) {
        console.log("logout error: ", error);
        setAuthToken(undefined);
        setUser(undefined);
        localStorage.removeItem("authToken");
      });
  }

  // Updating refresh token
  function updateAccess() {
    if (authToken) {
      axios
        .post(
          "https://api.apu-s.space/token-refresh",
          {},
          { headers: { token: authToken } }
        )
        .then(function (response) {
          const newToken = response.data.access_token;

          setAuthToken(newToken);
          setUser(jwtDecode(newToken));
          localStorage.setItem("authToken", JSON.stringify(newToken));
        })
        .catch(function (error) {
          console.log(error);
          callLogout();
        });
    }
  }

  // Updating refresh token after revisit and access token expire time
  useEffect(() => {
    let twentyMinutes = 1000 * 60 * 20;

    let interval = setInterval(() => {
      if (authToken) {
        updateAccess();
      }
    }, twentyMinutes);
    return () => clearInterval(interval);
  }, [authToken]);

  function getConfiguration(authTokenProp?: string) {
    axios
      .get("https://api.apu-s.space/configuration", {
        headers: {
          token: authTokenProp ? authTokenProp : authToken,
        },
      })
      .then((response) => {
        setUserConfig(response.data.config);
        if (Object.values(response.data.config.quiz).every((x) => x === null)) {
          setFirstTime(true);
          navigate("/quiz");
        } else {
          setFirstTime(false);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuthToken,
        setUser,
        authToken,
        callLogout,
        userConfig,
        firstTime,
        getConfiguration,
        clearStates,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
