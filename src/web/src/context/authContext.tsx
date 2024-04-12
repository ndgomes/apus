import { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface CurrentUserContextType {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string | undefined>>;

  user: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;

  signupWarning: boolean;
  setSignupWarning: React.Dispatch<React.SetStateAction<boolean>>;

  callLogout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
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

  let [signupWarning, setSignupWarning] = useState<boolean>(false);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuthToken,
        setUser,
        authToken,
        callLogout,
        signupWarning,
        setSignupWarning,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
