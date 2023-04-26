import { Guild } from '../types/Guild.ts';
import Client from './../Client.ts';
import EventUtil from "../Util/Events.ts";

export default class GuildManager {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    async fetchGuild(id: string) {
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
}