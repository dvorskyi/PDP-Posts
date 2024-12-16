import {FormState, SignupFormSchema, SigninFormSchema} from "@/lib/definitions";
import {appAPI} from "@/api/axios";
import {signIn} from "next-auth/react";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, password } = validatedFields.data

    await appAPI.post('/api/user', {
        username: name,
        email,
        password,
    });
}

export async function signin(state: FormState, formData: FormData) {
    const validatedFields = SigninFormSchema.safeParse({
        name: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, password } = validatedFields.data;

    const result = await signIn('credentials', {
        name,
        password,
        redirect: false,
    });

    if (result?.ok) {
        window.location.href = '/posts';
    } else {
        return {
            message: "Invalid credentials",
        }
    }
}