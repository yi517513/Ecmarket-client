import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Tooltip } from "@components/tooltip/Tooltip";
import { useEffect } from "react";

export const TextEditor = ({ value = "", onChange, tip }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <Tooltip content={tip} position="right_outside">
      <EditorContent
        editor={editor}
        className="overflow-y-auto p-1 border border-gray-400 h-[280px] flex [&_.ProseMirror]:flex-1 [&_.ProseMirror]:outline-none"
      />
    </Tooltip>
  );
};
