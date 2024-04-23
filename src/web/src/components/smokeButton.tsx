import { Loading } from "./loading";

interface SmokeButtonProps {
  timeToNextCigarette: string;
  isLoading: boolean;
  onClickSmoke: () => void;
}

export function SmokeButton(props: SmokeButtonProps) {
  return (
    <div className="border-2 border-purple-500 rounded-lg h-[28rem] md:h-[38rem] lg:h-[42rem] p-4 md:w-2/5 my-4 mx-4 md:ml-4 lg:ml-8 flex flex-col items-center justify-center">
      <button
        onClick={props.onClickSmoke}
        className="bg-purple-500 hover:bg-gradient-to-r from-purple-500 to-purple-900 flex justify-center items-center text-center rounded-3xl w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
      >
        <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
          Smoke
        </span>
      </button>
      <div className="text-center text-black dark:text-white mt-8">
        <h2 className="font-semibold">You can smoke since:</h2>
        {props.isLoading || props.timeToNextCigarette === "" ? (
          <Loading />
        ) : (
          <h1 className="text-purple-500 mt-2">{props.timeToNextCigarette}</h1>
        )}
      </div>
    </div>
  );
}
