export type User = {
    id: string,
    username: string,
    discriminator: string | null,
    avatar: string
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean | null,
    banner?: string | null,
    accent_color?: number | null,
    locale?: string,
    verified?: boolean | null,
    email?: string | null,
    flags?: UserFlags,
    premium_type?: UserPremiumType,
    public_flags?: UserFlags
    global_name?: string | null,
    display_name?: string | null,
}

export enum UserFlags {
    Staff = 1 << 0,
    Partner = 1 << 1,
    Hypesquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    MFASMS = 1 << 4,
    PremiumPromoDismissed = 1 << 5,
    HypeSquadOnlineHouse1 = 1 << 6,
    HypeSquadOnlineHouse2 = 1 << 7,
    HypeSquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    HasUnreadUrgentMessages = 1 << 13,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModerator = 1 << 18,
    BotHTTPInteractions = 1 << 19,
    Spammer = 1 << 20,
    DisablePremium = 1 << 21,
    ActiveDeveloper = 1 << 22,
    Quarantined = 17592186044416,
    Collaborator = 1125899906842624,
    RestrictedCollaborator = 2251799813685248,
}

export enum UserPremiumType {
    None, Nitro, NitroClassic, NitroBasic
}