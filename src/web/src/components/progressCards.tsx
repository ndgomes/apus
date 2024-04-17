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
    <div className="flex bg-gradient-to-r from-purple-500 to-purple-900 rounded-lg h-14 items-center justify-between p-4 md:p-6 lg:p-8">
      <div className="flex-1">
        <span className="text-white font-bold text-base md:text-xl lg:text-2xl">
          {props.name}
        </span>
      </div>
      <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex justify-center items-center text-center p-1 md:p-3 lg:p-4 shadow-xl">
        <span className="text-black font-bold text-sm md:text-base lg:text-lg">
          {props.result}
        </span>
      </div>
    </div>
  );
}

export function ProgressCards(props: ProgressCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4 md:p-4 lg:p-8">
      <Card name="Phase" result={props.phaseLevel} />
      <Card name="Phase Reduction" result={props.phaseReduction} />
      <Card name="Saved Cigarettes" result={props.savedCigarettes} />
    </div>
  );
}
