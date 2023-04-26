export type ThreadMember = {
    id?: string,
    userId?: string,
    joinTimestamp: Date,
    flags: number,
    member?: GuildMember
}

export type GuildMember = {
    roles: Array<string>,
    premiumSince?: string | null,
    pending: boolean,
    nick?: string | null,
    mute: boolean,
    deaf: boolean
    joinedAt: string,
    flags: number,
    communicationDisabledUntil: string | null,
    avatar: string | null
}