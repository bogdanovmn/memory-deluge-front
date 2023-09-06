import { AuthHttpClient } from "@bogdanovmn/ssofw"

export type Series = {
    id: string
    name: string
    episodes: number
}

export class MemoryDelugeService {
    private url: string
    private authHttpClient: AuthHttpClient

    constructor(url: string, authHttpClient: AuthHttpClient) {
        this.url = url
        this.authHttpClient = authHttpClient
    }

    getSeries(): Series[] {
        return [
            {id: "1", name: "RbW S1", episodes: 10},
            {id: "2", name: "RbW S2", episodes: 8},
            {id: "3", name: "Watchmen S1", episodes: 10},
        ]
    }
}