import { Loading } from "./loading";

interface SmokeButtonProps {
  timeToNextCigarette: string;
  isLoading: boolean;
  onClickSmoke: () => void;
}

export function SmokeButton(props: SmokeButtonProps) {
  return (
    <div className="border-2 border-purple-500 bg-purple-600 bg-opacity-25 rounded-lg h-[28rem] md:h-[38rem] lg:h-[42rem] p-4 md:w-2/5 my-4 mx-4 md:ml-4 lg:ml-8 flex flex-col items-center justify-center">
      <button
        onClick={props.onClickSmoke}
        className="bg-purple-500 hover:bg-gradient-to-r from-purple-500 to-purple-900 flex justify-center items-center text-center rounded-3xl w-32 h-32 md:w-52 md:h-52 lg:w-96 lg:h-96"
      >
        <span className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
          Smoke
        </span>
      </button>
      <div className="text-center text-white mt-8">
        <h2 className="font-semibold">You can smoke since:</h2>
        {props.isLoading ? (
          <Loading />
        ) : (
          <>
            {props.timeToNextCigarette === "" ? (
              <>
                <h1 className="text-purple-500 mt-2 font-bold text-lg">
                  The countdown ended!
                </h1>
                <h2 className="text-white mt-1 font-semibold">
                  But you don't have to smoke just yet!{" "}
                  <span className="text-green-500"> :)</span>
                </h2>
              </>
            ) : (
              <h1 className="text-purple-500 mt-2 font-bold text-lg">
                {props.timeToNextCigarette}
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}
