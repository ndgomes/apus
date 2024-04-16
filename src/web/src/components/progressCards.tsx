interface ProgressCardsProps {
  phaseLevel: string;
  phaseReduction: string;
  savedCigarettes: string;
}

export function ProgressCards(props: ProgressCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex bg-purple-600 rounded-lg h-32 items-center justify-between p-4 md:p-6 lg:p-8">
        <div className="flex-1">
          <span className="text-white font-bold text-base md:text-xl lg:text-2xl">
            Phase
          </span>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-slate-300 rounded-full flex justify-center items-center text-center p-3 md:p-4 lg:p-5 shadow-xl">
          <span className="font-bold text-base md:text-xl lg:text-2xl">
            {props.phaseLevel}
          </span>
        </div>
      </div>
      <div className="flex bg-purple-600 rounded-lg h-32 items-center justify-between p-4 md:p-6 lg:p-8">
        <div className="flex-1">
          <span className="text-white font-bold text-base md:text-xl lg:text-2xl">
            Phase Reduction
          </span>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-slate-300 rounded-full flex justify-center items-center text-center p-3 md:p-4 lg:p-5 shadow-xl">
          <span className="font-bold text-base md:text-xl lg:text-2xl">
            {props.phaseReduction}
          </span>
        </div>
      </div>
      <div className="flex bg-purple-600 rounded-lg h-32 items-center justify-between p-4 md:p-6 lg:p-8">
        <div className="flex-1">
          <span className="text-white font-bold text-base md:text-xl lg:text-2xl">
            Saved Cigarettes
          </span>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-slate-300 rounded-full flex justify-center items-center text-center p-3 md:p-4 lg:p-5 shadow-xl">
          <span className="font-bold text-base md:text-xl lg:text-2xl">
            {props.savedCigarettes}
          </span>
        </div>
      </div>
    </div>
  );
}
