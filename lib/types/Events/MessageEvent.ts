// deno-lint-ignore-file no-explicit-any

import { GuildMember } from "../GuildMember.ts"
import { MessageAuthor } from "../MessageAuthor.ts"

export type MessageEvent = {
    type: number,
    tts: boolean,
    timestamp: string,
    referencedMessage?: string | null,
    pinned: boolean,
    nonce: string,
    mentions: Array<any>,
    mentionRoles: Array<any>,
    mentionEveryone: Array<any>,
    member: GuildMember,
    id: string,
    flags: number,
    embeds: Array<any>,
    editedTimestamp?: string | null,
    content: string,
    components: Array<any>,
    channelId: string,
    author: MessageAuthor,
    attachments: Array<any>,
    guildId: string
}