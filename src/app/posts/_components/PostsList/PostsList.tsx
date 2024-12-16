"use client";

import { useModal } from "@/contexts/modal.context";
import { IPost } from "@/types";
import { PostCard, PostHeader, PostTitle, IconsWrapper, IconButton, PostContent } from "./styles";
import { FaEdit, FaTrash } from "react-icons/fa";
import { appAPI } from "@/api/axios";
import { mutate } from "swr";   
import { ModalTypes } from "@/enums";

export const PostsList = ({ posts }: { posts: IPost[] }) => {
    const { openModal } = useModal();

    const handleDelete = async (id: number) => {
        const response = await appAPI.delete(`/api/posts/${id}`);

        if (response.status === 200) {
            mutate('/api/posts');
        }
    }

    const handleEdit = (post: IPost) => {
        openModal({
            type: ModalTypes.POST,
            headerTitle: "Edit Post",
            size: "medium",
            params: {
                post
            }       
        });
    }

    return (
        <>
            {posts.map((post: IPost) => (
                <PostCard key={post.id} data-testid={`post-card-${post.id}`}>
                    <PostHeader>
                        <PostTitle>{post.title}</PostTitle>
                        <IconsWrapper>
                            <IconButton onClick={() => handleEdit(post)} aria-label="Edit">
                                <FaEdit size={18} />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(+post.id)} aria-label="Delete">
                                <FaTrash size={18} />
                            </IconButton>
                        </IconsWrapper>
                    </PostHeader>
                    <PostContent>{post.content}</PostContent>
                </PostCard>
            ))}
        </>
    )
}