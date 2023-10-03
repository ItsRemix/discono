import { Guild } from '../types/Guild.ts';
import { Role } from '../types/Role.ts';
import Client from './../Client.ts';
import EventUtil from "../Util/Events.ts";

/**
 * Class for GuildManager
 */
export default class GuildManager {
    private client: Client

    /**
     * Create GuildManager
     * @param {Client} client 
     */
    constructor(client: Client) {
        this.client = client
    }

    /**
     * Function for fetching guilds
     * @param {string} id ID of the guild
     * @returns {Promise<Guild>} Fetched Guild
     */
    async fetchGuild(id: string): Promise<Guild> {
        const fetchData = await (await fetch(`https://discord.com/api/v10/guilds/${id}?with_counts=true`, {
            method: "GET",
            headers: {
                "Authorization": "Bot " + this.client.token,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })).json()

        return (await EventUtil.snakeToCamelCase(fetchData) as Guild)
    }

    /**
     * Function for fetching GuildMember
     * @param {string} guildId ID of the guild
     * @param {string} id ID of the {GuildMember}
     * @returns {Promise<Guild>} Fetched Member
     */
    async fetchMember(guildId: string, id: string): Promise<Guild> {
        const fetchData = await (await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bot " + this.client.token,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })).json()

        return (await EventUtil.snakeToCamelCase(fetchData) as Guild)
    }

    /**
     * Function for fetching Roles
     * @param {string} guildId ID of the guild
     * @returns {Promise<Role[]>} Fetched Roles
     */
    async getRoles(guildId: string): Promise<Role[]> {
        const fetchData = await (await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
            method: "GET",
            headers: {
                "Authorization": "Bot " + this.client.token,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })).json()

        return (await EventUtil.snakeToCamelCase(fetchData) as Role[])
    }
}