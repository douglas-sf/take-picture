import { X } from 'phosphor-react';
import { ReactNode } from 'react';

interface ConfirmationModalProps {
  children?: ReactNode;
  closeModal: () => void;
}

export function Modal({ children, closeModal }: ConfirmationModalProps) {
  return (
    <div className="absolute inset-0 bg-black/80 z-10 flex justify-center items-center">
      <div className="min-w-[400px] p-6 bg-zinc-100 dark:bg-zinc-800 rounded relative">
        <button
          className="absolute top-4 right-4 outline-none ring-blue-600 ring-offset-2 ring-offset-zinc:100 dark:ring-offset-zinc-800 focus:ring-2"
          onClick={closeModal}
        >
          <X size={20} weight="bold" />
        </button>

        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
