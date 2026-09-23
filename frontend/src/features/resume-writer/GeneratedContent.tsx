"use client";

import { Copy, Check, Save } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  content: string;
  onChange?: (content: string) => void;
};

export default function GeneratedContent({
  content,
  onChange,
}: Props) {
  const [value, setValue] = useState(content);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setValue(content);
  }, [content]);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const newValue = e.target.value;

    setValue(newValue);
    onChange?.(newValue);
  }

  if (!content) return null;

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Generated Content
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Review and edit the AI-generated content before saving.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        rows={12}
        className="mt-6 w-full resize-y rounded-xl border border-border bg-background p-5 text-sm leading-7 outline-none transition focus:ring-2 focus:ring-primary"
      />

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {value.length} characters
        </span>

        <span>
          You can edit the generated content before saving.
        </span>
      </div>
    </section>
  );
}