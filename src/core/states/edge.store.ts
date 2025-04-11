import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EdgeState } from "../types";

const useEdgeStore = create<EdgeState>()(
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
    }),
    {
      name: "edge-store",
    },
  ),
);

export default useEdgeStore;
