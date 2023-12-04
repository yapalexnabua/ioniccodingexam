export interface Horse {
    [key: string]: string | boolean | number | null;

    id: string;
    name: string;
    jockey: string;
    trainer: string;
    is_favorite: boolean;
    deleted_at: string | null;
    age: number;
}