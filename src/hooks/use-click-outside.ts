import { RefObject, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement | null>;
  redirectPath: string;
}

export function useClickOutside({ ref, redirectPath }: UseClickOutsideProps) {
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-dropdown-menu]")) return;
    if (ref.current && !ref.current.contains(target)) {
      router.push(redirectPath);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const resetFocus = () => {
    router.push(redirectPath);
  };

  return { resetFocus };
}
