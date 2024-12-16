import React from "react";

import {Title, Header, CloseButton} from "./styles";
import { AiOutlineClose } from "react-icons/ai";


interface IModalHeaderProps {
  title?: string;
  onClose: () => void
}

export const ModalHeader = ({ title, onClose }: IModalHeaderProps) => {
  return (
    <Header>
      <Title>{title}</Title>
      <CloseButton onClick={onClose}>
        <AiOutlineClose />
      </CloseButton>
    </Header>
  );
};
