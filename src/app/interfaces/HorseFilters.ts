export type Level = '1' | '2' | '3';

export interface HorseFilters {
    [key: string]: string | Level | null;

    name: string | null;
    jockey: string | null;
    trainer: string | null;
    level: Level | null;
}
