"use client";

import { BaseContainer } from "@/components/layout/base-container";
import { BaseBoard } from "@/components/notes/base-board";
import { BaseList } from "@/components/notes/base-list";
import { BaseBottomBar } from "@/components/layout/base-bottom-bar";
import { BaseSideDrawer } from "@/components/notes/base-side-drawer";
import Note from "@/components/notes/note";
import NoteNode from "@/components/notes/note-node";
import { TextEditor } from "@/components/notes/text-editor";
import { useDashboard } from "@/hooks/use-dashboard";

export function DashboardContent({ userEmail }: { userEmail: string }) {
  const {
    notes,
    viewMode,
    createNote,
    moveNote,
    deleteNote,
    editNoteContent,
    currentNote,
    toggleViewMode,
    edges,
    createEdge,
    deleteEdge,
  } = useDashboard();

  return (
    <BaseContainer className="relative" viewMode={viewMode} onToggleViewMode={toggleViewMode} accountName={userEmail}>
      <BaseBoard
        notes={notes}
        edges={edges}
        onMoveNote={moveNote}
        onCreateEdge={createEdge}
        onDeleteEdge={deleteEdge}
        nodeComponent={NoteNode}
      />
      <BaseList notes={notes} viewMode={viewMode} noteComponent={Note} />
      <BaseSideDrawer
        currentNote={currentNote || null}
        onDeleteNote={deleteNote}
        onEditNoteContent={editNoteContent}
        redirectPath="/dashboard"
        textEditorComponent={TextEditor}
      />
      <BaseBottomBar onCreateNote={createNote} />
    </BaseContainer>
  );
}
