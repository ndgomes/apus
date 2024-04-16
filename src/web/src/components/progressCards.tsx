interface ProgressCardsProps {
  phaseLevel: string;
  phaseReduction: string;
  savedCigarettes: string;
}

interface CardProps {
  name: string;
  result: string;
}

function Card(props: CardProps) {
  return (
    <div className="flex bg-purple-600 rounded-lg h-14 items-center justify-between p-4 md:p-6 lg:p-8">
      <div className="flex-1">
        <span className="text-white font-bold text-base md:text-xl lg:text-2xl">
          {props.name}
        </span>
      </div>
      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-slate-300 rounded-full flex justify-center items-center text-center p-1 md:p-3 lg:p-4 shadow-xl">
        <span className="font-bold text-sm md:text-base lg:text-lg">
          {props.result}
        </span>
      </div>
    </div>
  );
}

export function ProgressCards(props: ProgressCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 lg:p-8">
      <Card name="Phase" result={props.phaseLevel} />
      <Card name="Phase Reduction" result={props.phaseReduction} />
      <Card name="Saved Cigarettes" result={props.savedCigarettes} />
    </div>
  );
}
