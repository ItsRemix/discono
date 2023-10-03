export type Role = {
    id: string,
    name: string,
    color: number,
    hoist: boolean,
    icon: string | null,
    unicodeEmoji: string | null,
    position: number,
    permissions: string,
    managed: boolean,
    mentionable: boolean,
    // deno-lint-ignore no-explicit-any
    tags: any[] | null,
    flags: number
}