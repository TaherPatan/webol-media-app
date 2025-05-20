export interface TvShow {
    id: number;
    title: string;
    description?: string;
    release_year?: number;
}

export interface Movie {
    id: number;
    title: string;
    description?: string;
    release_year?: number;
}

export interface Comment {
    id: number;
    media_type: 'tv_show' | 'movie';
    media_id: number;
    author?: string;
    content: string;
    created_at?: string;
}

export interface MediaWithComments extends TvShow, Movie {
    comments: Comment[];
}