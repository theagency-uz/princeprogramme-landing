"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ApplicationDialogContext = createContext<((returnFocusTo: HTMLElement | null) => void) | null>(null);

export function useApplicationDialog() {
  const openDialog = useContext(ApplicationDialogContext);
  if (!openDialog) throw new Error("Application dialog provider is missing");
  return openDialog;
}

export function ApplicationDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  return (
    <ApplicationDialogContext.Provider value={(returnFocusTo) => {
      returnFocusRef.current = returnFocusTo;
      setOpen(true);
    }}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent onCloseAutoFocus={(event) => {
          if (returnFocusRef.current?.isConnected) {
            event.preventDefault();
            returnFocusRef.current.focus();
            returnFocusRef.current = null;
          }
        }}>
          <DialogHeader className="pr-10">
            <DialogTitle className="font-display text-[2rem] leading-tight font-semibold sm:text-4xl">
              Оставьте свои контакты
            </DialogTitle>
            <DialogDescription>Мы с вами свяжемся</DialogDescription>
          </DialogHeader>
          <ApplicationForm trackLead />
        </DialogContent>
      </Dialog>
    </ApplicationDialogContext.Provider>
  );
}

export function ApplicationDialogTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return <DialogTrigger asChild><button type="button" className={className}>{children}</button></DialogTrigger>;
}
