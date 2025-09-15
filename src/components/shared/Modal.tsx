import React, { useCallback, useEffect, useRef } from "react";
import { useToggleState } from "@/store/toggle";

export default function Modal({title, children}: {title: string; children: React.ReactNode}) {
  const {modal, setModal, setSelect} = useToggleState();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<Element | null>(null);

  const focusableSelector = "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

  const closeModal = useCallback(() => {
    setSelect(false);
    setModal(false);
    if (lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus();
    }
  }, [setSelect, setModal]);

  const closeModalWithKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
    if (e.key === "Tab" && modalRef.current) {
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [closeModal]);

  useEffect(() => {
    if (modal) {
      document.addEventListener("keydown", closeModalWithKey);
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        focusableSelector
      );
      if (focusable && focusable.length) {
        focusable[0].focus();
      }
    } else {
      document.removeEventListener("keydown", closeModalWithKey);
    }

    return () => document.removeEventListener("keydown", closeModalWithKey);
  }, [modal, closeModalWithKey]);

  return modal && (
    <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={closeModal} className="absolute inset-0 bg-black/50" />
      <div ref={modalRef} className="relative w-full max-w-lg bg-orange-700 rounded-2xl shadow-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl text-yellow-100 font-medium">{title}</h2>
          <button
            onClick={closeModal}
            className="h-8 w-8 rounded-md hover:bg-slate-100 text-yellow-100 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="h-5" />
        {children}
      </div>
    </div>
  );
}
