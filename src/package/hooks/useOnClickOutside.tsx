import { RefObject, useEffect } from "react";

type MouseOrTouchEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: RefObject<any>,
  handler: (event: MouseOrTouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseOrTouchEvent): void => {
      if (!ref.current || ref.current.contains(event.target!)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
