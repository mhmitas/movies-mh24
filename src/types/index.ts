export type GetAllMoviesParams = {
    limit: number,
    page?: number,
    query?: string,
    type?: "movie" | "series",
    genre?: string[]
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type NavItemProps = {
    id: string
    label: string
    href?: string,
    children?: NavItemProps[]
    disabled?: boolean
}

export type MovieSuggestion = {
    _id: string
    title: string
    poster?: string
    year?: number
    runtime?: number
    type?: string,
    season?: string,
    episode?: string
}

export type SearchOptionsParams = {
    purpose: "suggestions" | "full";
    query: string;
    page?: number;
    limit?: number;
};