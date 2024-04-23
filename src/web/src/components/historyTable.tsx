interface HistoryTableProps {
  cigarettesHistory?: Date[];
}

export function HistoryTable(props: HistoryTableProps) {
  function formatDate(date: Date): string {
    const convertDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(convertDate);
  }

  return (
    <div className="border-4 border-purple-500 rounded-lg h-[28rem] md:h-[38rem] lg:h-[42rem] p-4 md:w-2/3 my-4 mx-4 md:mr-4 lg:mr-8 overflow-auto text-center">
      {props.cigarettesHistory ? (
        <div className="text-black dark:text-white">
          <span className="font-semibold">Cigarettes History</span>

          {props.cigarettesHistory.map((el, index) => (
            <div key={index} className="mt-4">
              <h3>{formatDate(el)}</h3>
              {props.cigarettesHistory &&
                props.cigarettesHistory?.length - 1 > index && (
                  <div className="h-0.5 my-3 bg-purple-500 mx-10"></div>
                )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-black dark:text-white">
          <div className="font-semibold">Cigarettes History</div>
          <div className="font-semibold text-purple-500 mt-3">
            We have no history of your cigarettes today. <br /> We're happy for
            you
            <span className="text-green-500"> :)</span>
          </div>
        </div>
      )}
    </div>
  );
}
