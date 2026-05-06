import { useState } from "react";

export function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  function handlePopup() {
    setIsOpen((prev) => !prev);
  }

  const close = () => setIsOpen(false);

  return { handlePopup, isOpen, close };
}
