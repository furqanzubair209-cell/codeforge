import Editor, { type OnMount } from "@monaco-editor/react";
import { useCodeforgeStore } from "@/store/useCodeforgeStore";

export function CppEditor({
  value,
  onChange,
  onMount,
}: {
  value: string;
  onChange: (value: string) => void;
  onMount?: OnMount;
}) {
  const theme = useCodeforgeStore((s) => s.preferences.theme);
  const fontSize = useCodeforgeStore((s) => s.preferences.fontSize);

  return (
    <Editor
      height="100%"
      language="cpp"
      theme={theme === "dark" ? "vs-dark" : "light"}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={onMount}
      options={{
        fontSize,
        fontFamily: "'JetBrains Mono', monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        wordWrap: "on",
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: "gutter",
        smoothScrolling: true,
        cursorBlinking: "smooth",
        contextmenu: true,
        fixedOverflowWidgets: true,
      }}
      loading={
        <div className="flex h-full items-center justify-center text-sm text-forge-text-faint">
          Loading editor…
        </div>
      }
    />
  );
}
