"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps) {
  const variantStyles = {
    default: "bg-card border-border text-foreground",
    success: "bg-success text-white border-success",
    destructive: "bg-destructive text-white border-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      role="alert"
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && (
            <div className="font-semibold text-sm mb-1">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

interface ToasterProps {
  toasts: ToastProps[];
}

export function Toaster({ toasts }: ToasterProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Toast hook
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 3000,
    }: Omit<ToastProps, "id" | "onClose">) => {
      const id = Math.random().toString(36).substr(2, 9);

      const newToast: ToastProps = {
        id,
        title,
        description,
        variant,
        duration,
        onClose: () => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        },
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  return { toast, toasts };
}
