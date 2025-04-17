import { Extension } from "@tiptap/core";
import { Editor } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

interface SlashCommand {
  title: string;
  command: (props: CommandProps) => void;
  icon: string;
}

interface CommandProps {
  editor: Editor;
  range: { from: number; to: number };
  command?: (props: CommandProps) => void;
}

interface SuggestionProps {
  editor: Editor;
  range: { from: number; to: number };
  clientRect: () => DOMRect;
  command: (props: CommandProps) => void;
}

const slashCommands: SlashCommand[] = [
  {
    title: "Text",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
    icon: "Text",
  },
  {
    title: "Heading 1",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
    icon: "H1",
  },
  {
    title: "Heading 2",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
    icon: "H2",
  },
  {
    title: "Bullet List",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    icon: "•",
  },
  {
    title: "Numbered List",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    icon: "1.",
  },
  {
    title: "Task List",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
    icon: "☐",
  },
  {
    title: "Code Block",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
    icon: "</>",
  },
  {
    title: "Quote",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
    icon: "❝",
  },
  {
    title: "Table",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    },
    icon: "⊞",
  },
  {
    title: "Horizontal Rule",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
    icon: "—",
  },
  {
    title: "Image",
    command: ({ editor, range }: CommandProps) => {
      const url = window.prompt("Enter image URL");
      if (url) {
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
      }
    },
    icon: "🖼️",
  },
  {
    title: "Link",
    command: ({ editor, range }: CommandProps) => {
      const url = window.prompt("Enter URL");
      if (url) {
        editor.chain().focus().deleteRange(range).setLink({ href: url }).run();
      }
    },
    icon: "🔗",
  },
  {
    title: "Highlight",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleHighlight().run();
    },
    icon: "🖍️",
  },
  {
    title: "Strikethrough",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleStrike().run();
    },
    icon: "~~",
  },
  {
    title: "Divider",
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
    icon: "≡",
  },
];

const SlashCommands = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: { from: number; to: number };
          props: CommandProps;
        }) => {
          if (props.command) {
            props.command({ editor, range });
          }
        },
        render: () => {
          let component: HTMLElement;
          let popup: ReturnType<typeof tippy>;

          return {
            onStart: (props: SuggestionProps) => {
              const editorElement = props.editor.view.dom;
              const editorId = editorElement.getAttribute("data-editor-id");
              const isDrawerOpen = editorElement.getAttribute("data-is-drawer-open");
              console.log(editorId, isDrawerOpen);
              if (editorId === "note" && isDrawerOpen === "true") return;
              component = document.createElement("div");
              component.className = "slash-menu";
              component.setAttribute("data-slash-command", "");
              component.setAttribute("data-editor-id", editorId || "");

              slashCommands.forEach((item) => {
                const menuItem = document.createElement("div");
                menuItem.className = "slash-menu-item";

                const iconContainer = document.createElement("span");
                iconContainer.className = "menu-icon";
                iconContainer.textContent = item.icon;
                menuItem.appendChild(iconContainer);

                const title = document.createElement("span");
                title.textContent = item.title;
                menuItem.appendChild(title);

                menuItem.addEventListener("click", (e) => {
                  e.stopPropagation();
                  item.command(props);
                  popup?.[0]?.hide();
                });

                component.appendChild(menuItem);
              });

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                theme: "light",
                onCreate: (instance) => {
                  instance.popper.setAttribute("data-dropdown-menu", "");
                  instance.popper.setAttribute("data-editor-id", editorId || "");
                },
              });
            },
            onUpdate: (props: SuggestionProps) => {
              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }
              return false;
            },
            onExit: () => {
              if (popup && popup[0]) {
                popup[0].destroy();
              }
              if (component) {
                component.remove();
              }
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default SlashCommands;
