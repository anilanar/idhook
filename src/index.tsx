import { nanoid } from "nanoid/non-secure";
import { useRef } from "react";

export const useUniqueId = (): ((key: string) => string) => {
  const mapRef = useRef<Map<string, string>>(new Map());
  return (key) => {
    const val = mapRef.current.get(key);
    if (val === undefined) {
      const val = nanoid();
      mapRef.current.set(key, val);
      return val;
    }
    return val;
  };
};
