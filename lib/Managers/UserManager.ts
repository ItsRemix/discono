import { User } from '../types/User.ts';
import Client from './../Client.ts';

export default class UserManager {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    async fetchUser(id: string) {
        const fetchData = await (await fetch(`https://discord.com/api/v10/users/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bot " + this.client.token,
                "Content-Type": "application/json"
            }
        }).catch((err) => {
            throw new Error("[REST] " + err)
        })).json()

        return (await fetchData.json() as User)
    }
}