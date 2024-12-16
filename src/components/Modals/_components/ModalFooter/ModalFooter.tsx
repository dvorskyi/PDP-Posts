import React, { ReactNode } from "react";

import { StyledModalFooter } from "./styles";

export const ModalFooter = ({ children }: {children: ReactNode}) => {
  return (
    <StyledModalFooter>
      {children}
    </StyledModalFooter>
  );
};
