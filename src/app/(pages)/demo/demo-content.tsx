"use client";

import { BaseContainer } from "@/components/base/base-container";
import { BaseBoard } from "@/components/base/base-board";
import { BaseList } from "@/components/base/base-list";
import { BaseBottomBar } from "@/components/base/base-bottom-bar";
import { BaseSideDrawer } from "@/components/base/base-side-drawer";
import { useDemo } from "@/hooks/use-demo";
import { Tables } from "@/database.types";
import { BaseNote } from "@/components/base/base-note";
import { BaseTextEditor } from "@/components/base/base-text-editor";
import { BaseTextEditorProps } from "@/components/base/base-text-editor";

function DemoTextEditor(props: BaseTextEditorProps) {
  return <BaseTextEditor {...props} />;
}

function DemoNote(props: Tables<"note"> & { handle?: boolean }) {
  const { notes, selectNote, deleteNote, debounceUpdate, createEdge, currentNote, viewMode } = useDemo();
  return (
    <BaseNote
      note={props}
      handle={viewMode === "board"}
      selectNote={selectNote}
      deleteNote={deleteNote}
      debounceUpdate={debounceUpdate}
      createEdge={createEdge}
      textEditorComponent={DemoTextEditor}
      notes={notes}
      currentNote={currentNote}
    />
  );
}

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
    debounceUpdate,
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
        nodeComponent={DemoNote}
      />
      <BaseList notes={notes} viewMode={viewMode} noteComponent={DemoNote} />
      <BaseSideDrawer
        currentNote={currentNote || null}
        onDeleteNote={deleteNote}
        onEditNoteContent={editNoteContent}
        redirectPath="/dashboard"
        textEditorComponent={DemoTextEditor}
        notes={notes}
        debounceUpdate={debounceUpdate}
        editNoteContent={editNoteContent}
      />
      <BaseBottomBar onCreateNote={createNote} />
    </BaseContainer>
  );
}
