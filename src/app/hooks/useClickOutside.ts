import { useEffect, useRef } from "react";

// Custom hook to detect clicks outside a referenced element and trigger a callback
// In this application, I use it for closing dropdowns, modals, or menus when clicking outside

interface IClickOutside {
  onClickOutside: () => void;
}

export const useClickOutside = <T extends HTMLElement>({
  onClickOutside,
}: IClickOutside) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
};
