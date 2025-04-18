"use client";

import "../notes/text-editor.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useEffect } from "react";
import SlashCommands from "../notes/slash-commands";
import { useDemo } from "@/hooks/use-demo";

export function DemoTextEditor(props: { noteId: string; isSideDrawer?: boolean }) {
  const { notes, debounceUpdate, currentNote } = useDemo();
  const note = notes?.find((note) => note.id === props.noteId);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Highlight,
      SlashCommands,
    ],
    content: note?.content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      debounceUpdate(props.noteId, { content });
    },
  });

  useEffect(() => {
    if (editor && note?.content !== editor.getHTML()) {
      editor.commands.setContent(note?.content || "");
    }
  }, [note?.content, editor]);

  useEffect(() => {
    if (editor) {
      const editorElement = editor.view.dom;
      editorElement.setAttribute("data-editor-id", props.isSideDrawer ? "side-drawer" : "note");
      editorElement.setAttribute("data-is-drawer-open", currentNote ? "true" : "false");
    }
  }, [editor, props.isSideDrawer, currentNote]);

  return (
    <div className="notion-style-editor" data-dropdown-menu>
      <EditorContent
        editor={editor}
        className="prose max-w-none focus:outline-none cursor-text h-full"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
