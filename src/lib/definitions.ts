import { z } from 'zod'

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export type FormState =
    | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        title?: string[]
        content?: string[]
    }
    message?: string
    id?: number
    title?: string
    content?: string
    onClose?: () => void
}
    | undefined

export const SigninFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
    password: z.string().trim(),
})

export const PostFormSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2, { message: 'Title must be at least 2 characters long.' }).trim(),
    content: z.string().min(2, { message: 'Content must be at least 2 characters long.' }).trim(),
})