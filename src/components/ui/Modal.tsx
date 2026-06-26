import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-auto max-h-[80vh] z-50">
          <Dialog.Title className="text-lg font-semibold mb-3">{title}</Dialog.Title>
          {children}
          <Dialog.Close className="mt-4 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-xl transition-colors">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}