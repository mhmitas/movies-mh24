export type GetAllMoviesParams = {
    page: number,
    limit: number,
    query: string,
    type: string,
    genre: string[]
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
    href: string
}

export type MovieSuggestion = {
    _id: string
    title: string
    poster?: string
    year?: number
    runtime?: number
    type?: string
}

export type SearchOptionsParams = {
    purpose: "suggestions" | "full";
    query: string;
    page?: number;
    limit?: number;
};