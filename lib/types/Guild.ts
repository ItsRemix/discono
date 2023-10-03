// deno-lint-ignore-file no-explicit-any
import { Role } from "./Role.ts"

export type Guild = {
    id: string,
    name: string,
    icon?: string,
    iconHash?: string,
    splash?: string,
    discoverySplash?: string,
    ownerId: string,
    permissions?: string,
    // TODO: region will be changed to channel.rtcRegion
    region?: string,
    afkChannelId?: string,
    afkTimeout: number,
    widgetEnabled?: boolean,
    widgetChannelId?: string,
    verificationLevel: number,
    defaultMessageNotifications: number,
    explicitContentFilter: number,
    // TODO: Change any to Role type (https://discord.com/developers/docs/topics/permissions#role-object)
    roles: Array<Role>,
    // TODO: Change any to Emoji type (https://discord.com/developers/docs/resources/emoji#emoji-object)
    emojis: Array<any>,
    // TODO: Change any to GuildFeature type (https://discord.com/developers/docs/resources/guild#guild-object-guild-features)
    features: Array<any>,
    mfaLevel: number,
    applicationId?: string,
    systemChannelId?: string,
    systemChannelFlags: number,
    rulesChannelId?: string,
    maxPresences?: number,
    maxMembers?: number,
    vanityUrlCode?: string,
    description?: string,
    banner?: string,
    premiumTier: number,
    premiumSubscriptionCount?: number,
    preferedLocal: string,
    publicUpdatesChannelId?: string,
    maxVideoChannelUsers?: number,
    maxStageVideoChannelUsers?: number,
    approximateMemberCount?: number,
    approximatePresenceCount?: number,
    // TODO: Change any to WelcomeScreen type (https://discord.com/developers/docs/resources/guild#welcome-screen-object)
    welcomeScreen?: any,
    nsfwLevel: number,
    // TODO: Change any to Sticker type (https://discord.com/developers/docs/resources/sticker#sticker-object)
    stickers?: Array<any>,
    premiumProgressBarEnabled: boolean
}