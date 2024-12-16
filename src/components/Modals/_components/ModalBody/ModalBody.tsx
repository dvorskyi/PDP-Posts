import React, { ReactNode } from "react";
import { StyledModalBody } from "./styles";

export const ModalBody = ({ children }: {children: ReactNode}) => {

  return (
    <StyledModalBody>
      {children}
    </StyledModalBody>
  );
};
