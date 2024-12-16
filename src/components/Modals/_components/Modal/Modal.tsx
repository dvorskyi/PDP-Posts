"use client";

import { useEffect } from "react";

import { renderModalContent } from "@/components/Modals/renderModalContent";
import { IModalProps } from "@/types";

import { ModalHeader } from "@/components/Modals";

import { useModal } from "@/contexts";

import { Container, ModalBackdrop } from "./styles";

export const Modal = ({ modal }: { modal: IModalProps }) => {
  const { closeModal } = useModal();
  const { type, headerTitle, size = "medium" } = modal;

  useEffect(() => {
    if (document) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalBackdrop onClick={() => closeModal()}>
      <Container size={size} onClick={(e) => e.stopPropagation()}>
        {!modal.withoutHeader && <ModalHeader title={headerTitle} onClose={closeModal} />}
        {renderModalContent(type, modal)}
      </Container>
    </ModalBackdrop>
  );
};

export const Modals = () => {
  const { modals } = useModal();

  return <>
    {modals.map((modal) => (
      <Modal key={modal.type} modal={modal} />
    ))}
  </>;
};

