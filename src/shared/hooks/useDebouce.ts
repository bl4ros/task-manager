import React from "react";

export function useDebounce(delay = 300, notDelayInFirstTime = true) {
  const debouncing = React.useRef<NodeJS.Timeout>();
  const isFirstTime = React.useRef(notDelayInFirstTime);

  const debounce = React.useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => {
          func();
        }, delay);
      }
    },
    [delay]
  );

  return { debounce };
}
