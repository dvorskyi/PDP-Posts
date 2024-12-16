import { IPost } from "./post.types";

export interface IUser {
    id: string;
    name: string;
    email: string;
    posts: IPost[];
    createdAt: Date;
}