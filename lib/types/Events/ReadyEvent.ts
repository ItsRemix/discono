// deno-lint-ignore-file no-explicit-any
import { User } from '../User.ts'

export type ReadyEvent = {
    userSettings: Record<string, unknown>,
    user: User,
    sessionType: string,
    sessionId: string,
    resumeGatewayUrl: string,
    relationships: Array<any>,
    privateChannels: Array<any>,
    presences: Array<any>,
    guilds: Array<any>,
    guildJoinRequest: Array<any>,
    geoOrderedRtcRegions: Array<string>
}