"use client";

import { useModal } from "@/contexts/modal.context";
import { ModalTypes } from "@/enums";
import { Button } from "@/app/ui/styled-components";
import { PostCreationContainer } from "./styles";

export const PostCreation = () => {
    const { openModal } = useModal();

    const createNewPost = () => {
        openModal({
            type: ModalTypes.POST,
            size: "medium",
            headerTitle: "Create New Post",
        });
    }
    return (
        <PostCreationContainer>
            <Button onClick={createNewPost} aria-label="Create New Post">Create New Post</Button>
        </PostCreationContainer>
    )
}