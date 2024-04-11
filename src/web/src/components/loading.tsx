import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <div className="flex justify-center">
      <ReactLoading
        type="cylon"
        color={"#9333EA"}
        height={50}
        width={50}
        delay={50}
      />
    </div>
  );
};
