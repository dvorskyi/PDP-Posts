import { PostFormSchema } from "@/lib/definitions";

import { appAPI } from "@/api/axios";
import { FormState } from "@/lib/definitions";
import { mutate } from "swr";

export async function savePost(state: FormState, formData: FormData) {
    const validatedFields = PostFormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { title, content } = validatedFields.data;

    let result;
    
    if (state?.id) {
        result = await appAPI.put(`/api/posts/${state.id}`, {
            title,
            content,
        });
    } else {
        result = await appAPI.post('/api/posts', {
            title,
            content,
        });
    }

    if (!(result.status === 200)) {
        return {
            message: "Failed to save post",
        }
    } else {
        mutate('/api/posts');
        state.onClose();
    }
}