import { useContext, useState } from "react";
import { Header, Quiz } from "../components";
import { userConfigInterface } from "./dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface QuizPageProps {
  isFirstTime: boolean;
  userConfig: userConfigInterface | undefined;
}

export function QuizPage(props: QuizPageProps) {
  let navigate = useNavigate();

  const { authToken } = useContext(AuthContext);

  const [quest1, setQuest1] = useState<number>();
  const [quest2, setQuest2] = useState<number>();
  const [quest3, setQuest3] = useState<number>();
  const [errorState, setErrorState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleOnChange = (e: any): void => {
    const { id, value } = e.target;

    if (id === "quest1") setQuest1(value);
    if (id === "quest2") setQuest2(value);
    if (id === "quest3") setQuest3(value);
  };

  const handleOnFocus = (): void => {};

  const handleOnSubmit = (event: React.FormEvent): void => {
    if (quest1 && quest2 && quest3) {
      event.preventDefault();
      setLoadingState(true);

      axios
        .post(
          "https://api.apu-s.space/quiz",
          {
            cigarettes_per_day: quest1,
            price_per_package: quest2,
            cigarettes_per_package: quest3,
          },
          { headers: { token: authToken } }
        )
        .then((response) => {
          console.log(response);
          setErrorState(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
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
          heading="First questionnaire"
          paragraph="This data will help us to give you the best strategy for ending your addiction to cigarettes "
          isLoading={loadingState}
          isFirstTime={props.isFirstTime}
          username={props.userConfig?.user.username}
        />
        <Quiz
          isError={errorState}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          onFocus={handleOnFocus}
        />
      </div>
    </div>
  );
}
