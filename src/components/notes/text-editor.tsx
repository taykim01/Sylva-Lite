"use client";

import "./text-editor.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useNote } from "@/hooks/use-note";
import { useEffect } from "react";
import SlashCommands from "./slash-commands";

export function TextEditor(props: { noteId: string; isSideDrawer?: boolean }) {
  const { notes, selectiveDebounce } = useNote();
  const currentNote = notes?.find((note) => note.id === props.noteId);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Color.configure({ types: [TextStyle.name, ListItem.name] }), TextStyle, SlashCommands],
    content: currentNote?.content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      selectiveDebounce(props.noteId, { content });
    },
  });

  useEffect(() => {
    if (editor && currentNote?.content !== editor.getHTML()) {
      editor.commands.setContent(currentNote?.content || "");
    }
  }, [currentNote?.content, editor]);

  // Set the data-editor-id attribute on the editor's DOM element
  useEffect(() => {
    if (editor) {
      const editorElement = editor.view.dom;
      editorElement.setAttribute("data-editor-id", props.isSideDrawer ? "side-drawer" : "note");
    }
  }, [editor, props.isSideDrawer]);

  return (
    <div className="notion-style-editor" data-dropdown-menu>
      <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
    </div>
  );
}
