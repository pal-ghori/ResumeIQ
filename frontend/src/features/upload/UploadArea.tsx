"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadAreaProps = {
  onFileSelect: (file: File) => void;
};

export default function UploadArea({
  onFileSelect,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  function handleBrowse() {
    inputRef.current?.click();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    onFileSelect(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
        dragging
          ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
          : "border-border"
      )}
    >
      <UploadCloud
        className={cn(
          "mx-auto mb-6 h-14 w-14 transition",
          dragging
            ? "text-blue-400 scale-110"
            : "text-blue-500"
        )}
      />

      <h2 className="text-2xl font-bold">
        Upload Your Resume
      </h2>

      <p className="mt-4 text-muted-foreground">
        Drag & Drop your PDF or DOCX here
      </p>

      <p className="my-6 text-muted-foreground">
        OR
      </p>

      <Button onClick={handleBrowse}>
        Browse Files
      </Button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />

      <p className="mt-6 text-sm text-muted-foreground">
        PDF • DOCX • Max 5 MB
      </p>
    </div>
  );
}