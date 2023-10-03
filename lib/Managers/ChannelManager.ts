// deno-lint-ignore-file no-explicit-any
import { Channel } from '../types/Channel.ts';
import Client from './../Client.ts';

/**
 * Class for ChannelManager
 */
export default class ChannelManager {
    private client: Client

    /**
     * Create ChannelManager
     * @param {Client} client 
     */
    constructor(client: Client) {
        this.client = client
    }

    /**
     * Function for fetching channels
     * @param {string} id ID of the channel
     * @returns {Promise<Channel>} Fetched Channel
     */
    async fetchChannel(id: string): Promise<Channel> {
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