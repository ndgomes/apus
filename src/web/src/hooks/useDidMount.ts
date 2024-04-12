import { useEffect } from "react";

export const useDidMount = (fun: () => void) => useEffect(fun, []);
