import { ModalTypes } from "@/enums"
import { PostModal } from "./PostModal/PostModal";
import { FC } from 'react';

export const renderModalContent = (type: ModalTypes, params: unknown) => {
    const modals: Record<ModalTypes, FC> = {
        [ModalTypes.LIKE]: () => <div></div>,
        [ModalTypes.COMMENT]: () => <div></div>,
        [ModalTypes.CONFIRMATION]: () => <div></div>,
        [ModalTypes.POST]: PostModal
    };

    const ResolvedModal = modals[type];

    return <ResolvedModal {...(params as object)} />;
}