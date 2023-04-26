// deno-lint-ignore-file no-explicit-any
import { Channel } from '../types/Channel.ts';
import Client from './../Client.ts';

export default class ChannelManager {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    async fetchChannel(id: string) {
        const fetchData = await (await fetch(`https://discord.com/api/v10/channels/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bot " + this.client.token,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })).json()

        fetchData["send"] = async (message: string, _embeds?: Array<any>) => {
            await fetch(`https://discord.com/api/v10/channels/${id}/messages`, {
                method: "POST",
                headers: {
                    "Authorization": "Bot " + this.client.token,
                    "Content-Type": "application/json"
                },
                body: `{
                    "content": "${message}"
                }`
            }).catch((err) => {
                throw new Error("[REST] " + err)
            })
        }

        return (await fetchData as Channel)
    }
}