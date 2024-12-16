"use client";

import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { IModalProps } from "@/types";

interface IModalStore {
  modals: IModalProps[];
}

interface IModalContextValue {
  get: () => IModalStore;
  set: (value: Partial<IModalStore>) => void;
  subscribe: (callback: () => void) => () => boolean;
  openModal: (payload: IModalProps) => void;
  closeModal: (closeAll?: boolean) => void;
}

const ModalContext = createContext<IModalContextValue | null>(null);

const useModalData = () => {
  const store = useRef<IModalStore>({ modals: [] });
  const get = useCallback(() => store.current, []);
  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<IModalStore>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach(callback => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const openModal = useCallback((payload: IModalProps) => {
    set({ modals: [...store.current.modals, payload] });
    if (document?.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [set]);

  const closeModal = useCallback((closeAll?: boolean) => {
    set({ 
      modals: closeAll ? [] : store.current.modals.slice(0, -1) 
    });
  }, [set]);

  return { get, set, subscribe, openModal, closeModal };
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={useModalData()}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const store = useContext(ModalContext);

  const modals = useSyncExternalStore(
    store.subscribe,
    () => store.get().modals
  );

  return {
    modals,
    openModal: store.openModal,
    closeModal: store.closeModal
  };
};