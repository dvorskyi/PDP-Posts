import { IUser } from "./user.types";

export interface IPost {
    id: string;
    title: string;
    content: string;
    author: IUser;
    authorId: string;
}