"use client";

import { useLoadData } from "@/hooks/use-load-data";
import { useEffect } from "react";

export function DataLoader() {
  const { readEdges, readMyNotes } = useLoadData();

  useEffect(() => {
    readEdges();
    readMyNotes();
  }, []);

  return null;
}
