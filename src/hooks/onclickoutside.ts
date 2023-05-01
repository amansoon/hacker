import { RefObject, useEffect, useRef } from "react";

type RefType = RefObject<HTMLElement>;
type CallbackType = () => void;
type WhenType = any;

export default function useClickOutside(ref: RefType, callback: CallbackType, when: WhenType) {
  const savedCallback = useRef<CallbackType>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  const handler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      savedCallback.current();
    }
  };

  useEffect(() => {
    if (when) {
      document.addEventListener("click", handler);
      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, when);
}
