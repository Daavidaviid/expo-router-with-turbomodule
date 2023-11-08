import { useEffect, useMemo } from "react";
import { useSharedValue, runOnJS, startMapper, stopMapper } from "./moduleWrapper";
export const useDerivedValueOnJS = (fn, deps) => {
  const init = useMemo(() => fn(), [fn]);
  const value = useSharedValue(init);
  useEffect(() => {
    const mapperId = startMapper(() => {
      "worklet";

      runOnJS(fn)();
    }, deps);
    return () => stopMapper(mapperId);
  }, [deps, fn]);
  return value;
};
//# sourceMappingURL=useDerivedValueOnJS.js.map