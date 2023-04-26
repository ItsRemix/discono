// deno-lint-ignore-file no-explicit-any
import { ThreadMember } from "./Member.ts";
import { User } from "./User.ts";

const channelType = {
    "GuildText": 0,
    "DM": 1,
    "GuildVoice": 2,
    "GuildCategory": 3,
    "GuildAnnouncement": 5,
    "AnnouncementThread": 10,
    "PublicThread": 11,
    "PrivateThread": 12,
    "GuildStageVoice": 13,
    "GuildDirectory": 14,
    "GuildForum": 15
}

export type Channel = {
    id: string,
    type: number,
    guildId?: string,
    position: number,
    permissionOverwrites?: Array<any>,
    name?: string,
    topic?: string,
    nsfw?: boolean,
    lastMessageId?: string,
    bitrate?: number,
    userLimit?: number,
    rateLimitPerUser?: number,
    recipients?: Array<User>,
    icon?: string,
    ownerId?: string,
    applicationId?: string,
    managed?: boolean,
    parentId?: string,
    lastPinTimestamp?: Date,
    rtcRegion?: string,
    videoQualityMode?: number,
    messageCount?: number,
    memberCount?: number,
    threadMetadata?: ThreadMetadata,
    member?: ThreadMember,
    defaultAutoArchiveDuration?: number,
    permissions?: string,
    flags?: number,
    totalMessageSent?: number,
    // TODO: Tag Type (https://discord.com/developers/docs/resources/channel#forum-tag-object)
    availableTags?: Array<any>,
    appliedTags?: Array<string>,
    // TODO: Default Reaction Type (https://discord.com/developers/docs/resources/channel#default-reaction-object)
    defaultReactionEmoji?: any,
    defualtThreadRateLimitPerUser?: number,
    defaultSortOrder?: number,
    defaultForumLayout?: number,
    send: (message: string) => void
}

export type ThreadMetadata = {
    archived: boolean,
    autoArchiveDuration: number,
    archiveTimestamp: Date,
    locked: boolean,
    invitable?: boolean,
    createTimestamp?: Date
}

export { channelType }