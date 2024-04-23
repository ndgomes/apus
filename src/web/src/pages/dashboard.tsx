import axios from "axios";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

import React, { useContext, useEffect, useState } from "react";
import {
  HistoryTable,
  ProgressCards,
  SideBar,
  SmokeButton,
} from "../components";
import { useDidMount } from "../hooks";
import { AuthContext, userConfigurationResponse } from "../context/authContext";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.tz.setDefault("Europe/London");

export const DashboardPage: React.FC = () => {
  const { authToken, getConfiguration } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const [countdownFormatted, setCountdownFormatted] = useState<string>("");

  const [lastCigaretteState, setLastCigaretteState] = useState<
    Date | undefined
  >(undefined);
  const [nextCigaretteState, setNextCigaretteState] = useState<
    Date | undefined
  >(undefined);
  const [historyData, setHistoryData] = useState<Date[] | undefined>(undefined);

  const userConfig: userConfigurationResponse = localStorage.getItem(
    "userConfig"
  )
    ? JSON.parse(localStorage.getItem("userConfig") || "")
    : undefined;

  const addHours = (date: Date, hours: number) => {
    let dateCopy = new Date(date.getTime());
    const hoursToAdd = hours * 60 * 60 * 1000;
    dateCopy.setTime(date.getTime() + hoursToAdd);
    return dateCopy;
  };

  useDidMount(() => {
    window.scrollTo(0, 0);
    getConfiguration();

    if (userConfig?.smoke_log.last_cigarette) {
      setLastCigaretteState(new Date(userConfig.smoke_log.last_cigarette));
    }

    if (userConfig?.smoke_log.next_cigarette) {
      setNextCigaretteState(new Date(userConfig.smoke_log.next_cigarette));
    }

    if (userConfig?.history) {
      setHistoryData(userConfig.history);
    }
  });

  useEffect(() => {
    if (lastCigaretteState) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeBetween = nextCigaretteState!.getTime() - currentTime;

        if (timeBetween <= 0) {
          clearInterval(intervalId);
          setCountdownFormatted("Countdown Ended");
        } else {
          const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeBetween % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000);

          // seconds always have two digits
          const secondsString = String(seconds).padStart(2, "0");

          setCountdownFormatted(`${days}:${hours}:${minutes}:${secondsString}`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastCigaretteState]);

  const handleOnClickSmoke = () => {
    setLoadingState(true);

    const currentDate = new Date();
    setLastCigaretteState(currentDate);
    setNextCigaretteState(addHours(currentDate, 1));

    axios
      .post(
        "https://api.apu-s.space/smoke",
        {
          last_cigarette: dayjs(currentDate).format(
            "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          ),
        },
        { headers: { token: authToken } }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        if (historyData !== undefined) {
          const newHistoryData = [...historyData];

          newHistoryData.push(
            new Date(dayjs(currentDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))
          );

          setHistoryData(newHistoryData);
        }
        setLoadingState(false);
      });
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="bg-gray-100 dark:bg-gray-800 w-screen">
        <div className="mt-3">
          <ProgressCards
            phaseLevel="5"
            phaseCompleted="80%"
            savedCigarettes="25"
            savedMoney="1 500,56 €"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <SmokeButton
            onClickSmoke={handleOnClickSmoke}
            timeToNextCigarette={countdownFormatted}
            isLoading={loadingState}
          />

          <HistoryTable cigarettesHistory={historyData} />
        </div>
      </div>
    </div>
  );
};
