"use client";

import { BaseContainer } from "@/components/layout/base-container";
import { BaseBoard } from "@/components/notes/base-board";
import { BaseList } from "@/components/notes/base-list";
import { BaseBottomBar } from "@/components/layout/base-bottom-bar";
import { BaseSideDrawer } from "@/components/notes/base-side-drawer";
import { DemoNote } from "@/components/demo/demo-note";
import { DemoNoteNode } from "@/components/demo/demo-note-node";
import { DemoTextEditor } from "@/components/demo/demo-text-editor";
import { useDemo } from "@/hooks/use-demo";

export function DemoContent() {
  const {
    notes,
    viewMode,
    edges,
    createNote,
    moveNote,
    deleteNote,
    editNoteContent,
    currentNote,
    toggleViewMode,
    createEdge,
    deleteEdge,
  } = useDemo();
  return (
    <BaseContainer
      className="relative"
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
      accountName="Demo Account"
      showTryButton
    >
      <BaseBoard
        notes={notes}
        edges={edges}
        onMoveNote={moveNote}
        onCreateEdge={createEdge}
        onDeleteEdge={deleteEdge}
        nodeComponent={DemoNoteNode}
      />
      <BaseList notes={notes} viewMode={viewMode} noteComponent={DemoNote} />
      <BaseSideDrawer
        currentNote={currentNote || null}
        onDeleteNote={deleteNote}
        onEditNoteContent={editNoteContent}
        redirectPath="/demo"
        textEditorComponent={DemoTextEditor}
      />
      <BaseBottomBar onCreateNote={createNote} />
    </BaseContainer>
  );
}
