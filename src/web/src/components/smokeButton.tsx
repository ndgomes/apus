interface SmokeButtonProps {
  timeToNextCigarette: string;
  onClickSmoke: () => void;
}

export function SmokeButton(props: SmokeButtonProps) {
  return (
    <div className="border-2 border-purple-500 rounded-lg h-[28rem] md:h-[38rem] lg:h-[42rem] p-4 md:w-2/5 my-4 mx-4 md:ml-4 lg:ml-8 flex flex-col items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-3/4 h-auto mb-4">
        <circle
          cx="50"
          cy="50"
          r="calc(min(45%, 45vw))"
          fill="#a855f7"
          onClick={() => props.onClickSmoke}
          cursor="pointer"
        />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          fill="white"
          font-size="16"
          dy=".3em"
          className="font-semibold"
        >
          Smoke
        </text>
      </svg>
      <div className="text-center text-white">
        <h2 className="font-semibold">You can smoke since:</h2>
        <h1 className="text-purple-500 mt-2">{props.timeToNextCigarette}</h1>
      </div>
    </div>
  );
}
