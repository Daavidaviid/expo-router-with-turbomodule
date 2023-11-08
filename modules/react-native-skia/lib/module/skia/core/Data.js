import { useEffect, useRef, useState } from "react";
import { Skia } from "../Skia";
import { Platform } from "../../Platform";

const factoryWrapper = (data2, factory, onError) => {
  const factoryResult = factory(data2);

  if (factoryResult === null) {
    onError && onError(new Error("Could not load data"));
    return null;
  } else {
    return factoryResult;
  }
};

export const loadData = (source, factory, onError) => {
  if (source === null || source === undefined) {
    return new Promise(resolve => resolve(null));
  } else if (source instanceof Uint8Array) {
    return new Promise(resolve => resolve(factoryWrapper(Skia.Data.fromBytes(source), factory, onError)));
  } else {
    const uri = typeof source === "string" ? source : Platform.resolveAsset(source);
    return Skia.Data.fromURI(uri).then(d => factoryWrapper(d, factory, onError));
  }
};

const useLoading = (source, loader) => {
  const mounted = useRef(false);
  const [data, setData] = useState(null);
  const dataRef = useRef(null);
  useEffect(() => {
    mounted.current = true;
    loader().then(value => {
      if (mounted.current) {
        setData(value);
        dataRef.current = value;
      }
    });
    return () => {
      var _dataRef$current;

      (_dataRef$current = dataRef.current) === null || _dataRef$current === void 0 ? void 0 : _dataRef$current.dispose();
      mounted.current = false;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);
  return data;
};

export const useCollectionLoading = (source, loader) => {
  const mounted = useRef(false);
  const [data, setData] = useState(null);
  const dataRef = useRef(null);
  useEffect(() => {
    mounted.current = true;
    loader().then(result => {
      const value = result.filter(r => r !== null);

      if (mounted.current) {
        setData(value);
        dataRef.current = value;
      }
    });
    return () => {
      var _dataRef$current2;

      (_dataRef$current2 = dataRef.current) === null || _dataRef$current2 === void 0 ? void 0 : _dataRef$current2.forEach(instance => instance === null || instance === void 0 ? void 0 : instance.dispose());
      mounted.current = false;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);
  return data;
};
export const useRawData = (source, factory, onError) => useLoading(source, () => loadData(source, factory, onError));

const identity = data => data;

export const useData = (source, onError) => useRawData(source, identity, onError);
//# sourceMappingURL=Data.js.map