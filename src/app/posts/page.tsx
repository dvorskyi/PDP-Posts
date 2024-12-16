"use client";

import { PostCreation} from "./_components/PostCreation/PostCreation";
import { IPost } from "@/types";
import { PostsList } from "./_components/PostsList/PostsList";
import { fetcher } from "@/lib/swr";
import useSWR from "swr";
import { Loader } from "@/components/Loader";

function Posts() {
    const { data: posts = [], isLoading } = useSWR<IPost[]>('/api/posts', fetcher);

    if (isLoading) return <Loader />

    return (
        <>
            <PostCreation />
            <PostsList posts={posts} />
        </>
    )
};

export default Posts;