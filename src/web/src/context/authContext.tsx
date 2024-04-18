import { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface userConfigurationResponse {
  quiz: {
    cigarettes_per_day: number | null;
    price_per_package: number | null;
    cigarettes_per_package: number | null;
  };
  smoke_log: {
    last_cigarette: Date | null;
    next_cigarette: Date | null;
  };
  user: {
    username: string;
    email: string;
    password: string;
    is_first_time: boolean;
  };
}

interface CurrentUserContextType {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string | undefined>>;

  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;

  userConfig: userConfigurationResponse | undefined;

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
    userConfigurationResponse | undefined
  >();

  //Call logout
  function callLogout() {
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
        response.data.config.user.is_first_time
          ? navigate("/quiz")
          : navigate("/dashboard");
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
        getConfiguration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
