// deno-lint-ignore-file no-explicit-any
import Client from './../../Client.ts';

/**
 * MessageCreate event
 * @param {any} data 
 * @param {Client} client 
 * @returns 
 */
export default function messageCreate(data: any, client: Client) {
    data["send"] = async (message: string, _embeds?: Array<any>) => {
        await fetch(`https://discord.com/api/v10/channels/${data.channelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": "Bot " + client.token,
                "Content-Type": "application/json"
            },
            body: `{
                "content": "${message}"
            }`
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })
    }

    data["reply"] = async (message: string) => {
        await fetch(`https://discord.com/api/v10/channels/${data.channelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": "Bot " + client.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: message,
                message_reference: {
                    message_id: data.id
                }
            })
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })
    }

    return data
}