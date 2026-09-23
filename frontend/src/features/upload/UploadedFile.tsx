"use client";

import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  file: File;
  onRemove: () => void;
};

export default function UploadedFile({
  file,
  onRemove,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <FileText className="h-8 w-8 text-blue-500" />

          <div>
            <h3 className="font-semibold">
              {file.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>

        </div>

        <Button
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}