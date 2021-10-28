import {Merge} from 'ts-essentials';

export type Model = {
    id?: number,
    tempId?: number
};

export type AuthorModel = Merge<Model, {
    books_count: number,
    name: string,
    surname: string
}>;

export type BookModel = Merge<Model, {
    author_id: number,
    is_borrowed: boolean,
    title: string
}>;

