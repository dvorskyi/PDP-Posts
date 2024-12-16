import { IPost } from "@/types";

export const mockAccessToken = 'mock-jwt-token';

export const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User'
};

export const mockPosts: IPost[] = [
    {
        id: '1',
        title: 'Test Post 1',
        content: 'Test Content 1',
        author: {
            id: '1',
            name: 'Test Author 1',
            email: 'test@example.com',
            posts: [],
            createdAt: new Date(),
        },
        authorId: '1',
    },
    {
        id: '2',
        title: 'Test Post 2',
        content: 'Test Content 2',
        author: {
            id: '2',
            name: 'Test Author 2',
            email: 'test2@example.com',
            posts: [],
            createdAt: new Date(),
        },
        authorId: '2',
    }
];