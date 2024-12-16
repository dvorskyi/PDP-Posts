"use client";

import { Button, ErrorText, Form, FormGroup } from "@/app/ui/styled-components";
import { ModalBody, ModalFooter } from "../_components";
import { useActionState } from "react";
import { savePost } from "@/app/actions/post";
import { useModal } from "@/contexts";
import { IPost } from "@/types";

export const PostModal = ({ params }: { params: { post: IPost } }) => {

    const { closeModal } = useModal();

    const [state, action, pending] = useActionState(savePost, {
        id: Number(params?.post?.id),
        title: params?.post?.title || '',
        content: params?.post?.content || '',
        errors: {},
        message: '',
        onClose: closeModal,
    });


    return (
        <>
            <ModalBody>
                <Form action={action} id="postForm">
                    <FormGroup>
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" placeholder="Title" defaultValue={params?.post?.title}  />
                        {state?.errors?.title && <ErrorText>{state.errors.title}</ErrorText>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="content">Content</label>
                        <input id="content" name="content" placeholder="Content" defaultValue={params?.post?.content} />
                        {state?.errors?.content && <ErrorText>{state.errors.content}</ErrorText>}
                    </FormGroup>
                </Form>
                {state?.message && <ErrorText>{state.message}</ErrorText>}
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="postForm" disabled={pending} aria-label="Save">Save</Button>
            </ModalFooter>
        </>
    )
};
