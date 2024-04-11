import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <div className="Loading_screen-container">
      <img
        src="https://github.com/cunhaac/apus/blob/master/.github/img/logo.png?raw=true"
        alt=""
      />
      <ReactLoading
        type="spin"
        color={"black"}
        height={50}
        width={50}
        delay={50}
      />
    </div>
  );
};
