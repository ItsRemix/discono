export type MessageAuthor = {
    username: string,
    publicFlags: number,
    id: string,
    globalName: string | null,
    displayName: string | null,
    discriminator: string,
    avatarDecoration: string | null,
    avatar: string
}