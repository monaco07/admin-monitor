export interface HostDTO{
    id: number,
    hostname: string,
    description?: string
}

export interface UpdatedAPITokenDTO{
    hostID: number,
    token: string
}