import { userConfigurationResponse } from "../context/authContext";

interface ProgressCardsProps {
  configuration: userConfigurationResponse;
}

enum SizeCard {
  small,
  big,
}

interface CardProps {
  name: string;
  text: string | number;
  size: SizeCard;
}

function Card(props: CardProps) {
  return (
    <div className="flex bg-gradient-to-r from-purple-500 to-purple-900 rounded-lg max-h-min items-center justify-between p-4">
      <div className="flex-1">
        <span className="text-white font-bold text-base md:text-sm lg:text-1xl">
          {props.name}
        </span>
      </div>
      {props.size === SizeCard.small && (
        <div className="w-auto h-min md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex justify-center items-center text-center p-2 md:p-1 lg:p-4 shadow-xl">
          <span className="text-black font-bold text-sm md:text-base lg:text-lg">
            {props.text}
          </span>
        </div>
      )}
      {props.size === SizeCard.big && (
        <div className="w-auto h-min md:h-10 lg:h-12 bg-white rounded-lg flex justify-center items-center text-center p-2 md:p-2 lg:p-3 shadow-xl">
          <span className="text-black font-bold text-sm md:text-sm lg:text-lg">
            {props.text}
          </span>
        </div>
      )}
    </div>
  );
}

export function ProgressCards(props: ProgressCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4 md:p-4 lg:p-8">
      <Card
        name="Phase"
        text={props.configuration.current_reduction_phase.phase_number}
        size={SizeCard.small}
      />
      <Card
        name="Phase Completed"
        text={
          props.configuration.current_reduction_phase
            .percentage_reduction_phase + "%"
        }
        size={SizeCard.big}
      />
      <Card
        name="Saved Cigarettes"
        text={
          props.configuration.saved_cigarettes_and_money.total_saved_cigarettes
        }
        size={SizeCard.small}
      />
      <Card
        name="Saved Money"
        text={
          props.configuration.saved_cigarettes_and_money.total_saved_money + "€"
        }
        size={SizeCard.big}
      />
    </div>
  );
}
