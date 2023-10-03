import { User } from '../types/User.ts';
import Client from './../Client.ts';

/**
 * Class for UserManager
 */
export default class UserManager {
    private client: Client

    /**
     * Create UserManager
     * @param {Client} client 
     */
    constructor(client: Client) {
        this.client = client
    }

    /**
     * Function for fetching user
     * @param {string} id
     * @returns {Promise<User>}
     */
    async fetchUser(id: string): Promise<User> {
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