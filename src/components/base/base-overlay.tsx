"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function BaseOverlay() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note_id");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const screenWidth = window.innerWidth;
    if (screenWidth < 640 && noteId) setShowOverlay(true);
    else setShowOverlay(false);
  }, [noteId]);

  return (
    <div
      className={`fixed inset-0 bg-black z-10 transition-opacity duration-500 ${
        showOverlay ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    />
  );
}
