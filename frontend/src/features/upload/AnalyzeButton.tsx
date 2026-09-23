"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  disabled: boolean;
  loading?: boolean;
  onClick: () => void;
};

export default function AnalyzeButton({
  disabled,
  loading = false,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{
        scale: disabled || loading ? 1 : 1.02,
      }}
      whileTap={{
        scale: disabled || loading ? 1 : 0.98,
      }}
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className="mt-8 w-full py-6 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            Analyze Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.div>
  );
}

