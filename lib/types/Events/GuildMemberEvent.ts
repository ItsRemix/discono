// deno-lint-ignore-file no-explicit-any
import { Guild } from "../Guild.ts"
import { User } from "../User.ts"

export type GuildMemberAdd = {
    user?: User,
    roles: Array<any>,
    premiumSince?: string,
    pending?: boolean,
    nick?: string,
    mute: boolean,
    joinedAt: string,
    guildId?: string,
    flags: number,
    deaf: boolean
    communicationDisabledUntil: string
    avatar?: string,
    permissions?: string,
    guild: Guild
}

export type GuildMemberRemove = {
    user?: User,
    guildId: string,
    guild: Guild
}