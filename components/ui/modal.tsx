"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={cn("w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl")}> 
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-[#4d3728]">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-[#f3ebe4]">
            <X size={18} className="text-[#6f5442]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
