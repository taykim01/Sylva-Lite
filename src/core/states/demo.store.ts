import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DemoStore } from "../types";

const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      edges: [],
      _setEdges: (edges) => set({ edges: edges }),
      _addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
      _updateEdge: (id, edge) =>
        set((state) => ({
          edges: state.edges.map((e) => (e.id === id ? { ...e, ...edge } : e)),
        })),
      _deleteEdge: (id) =>
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== id),
        })),
      _resetEdges: () => set({ edges: [] }),
      notes: [],
      viewMode: "board",
      _setNotes: (notes) => set({ notes: notes }),
      _setViewMode: (viewMode) => set({ viewMode }),
      _addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      _updateNote: (id, note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...note } : n)),
        })),
      _deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      _resetAll: () => set({ notes: [], edges: [] }),
    }),
    {
      name: "demo-store",
    },
  ),
);

export default useDemoStore;
