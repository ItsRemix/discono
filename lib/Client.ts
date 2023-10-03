// deno-lint-ignore-file no-explicit-any
import { EventEmitter } from "https://deno.land/x/eventemitter@1.2.4/mod.ts"
import { ClientOptions } from "./types/ClientOptions.ts";
import { ReadyEvent } from "./types/Events/ReadyEvent.ts";
import { MessageEvent } from "./types/Events/MessageEvent.ts";
import messageCreate from './Handlers/Event/MessageCreate.ts';
import { User } from "./types/User.ts"
import Util from "./Util/Config.ts";
import EventUtil from "./Util/Events.ts";
import { Activity } from "./types/Activity.ts";
import UserManager from './Managers/UserManager.ts';
import { GuildMemberAdd, GuildMemberRemove } from "./types/Events/GuildMemberEvent.ts";
import ChannelManager from './Managers/ChannelManager.ts';
import GuildManager from './Managers/GuildManager.ts';
import PermissionManager from "./Managers/PermissionManager.ts";

/**
 * Main class interacting with Discord API
 * @extends {EventEmitter}
 */
export default class Client extends EventEmitter<{
            ready (data: ReadyEvent): any,
            message (data: MessageEvent): any,
            debug (data: any): any ,
            guildMemberAdd (data: GuildMemberAdd): any,
            guildMemberRemove (data: GuildMemberRemove): any
        }>
    {
    options: ClientOptions
    ws: WebSocket | null
    heartbeat: number | null
    clientUser: User | null
    token: string | null
    UserManager: UserManager
    ChannelManager: ChannelManager
    GuildManager: GuildManager
    PermissionManager: PermissionManager

    /**
     * @param {ClientOptions} options Options of the client
     */
    constructor(options?: ClientOptions) {
        super()
        if(options == null) this.options = Util.createDefaultOptions();
        else this.options = options;

        this.ws = null
        this.heartbeat = null
        this.clientUser = null
        this.token = null
        this.UserManager = new UserManager(this)
        this.ChannelManager = new ChannelManager(this)
        this.GuildManager = new GuildManager(this)
        this.PermissionManager = new PermissionManager()
    }

    /**
     * Description
     * @param {Array<Activity>} activities Type of activity
     * @param {string} status Status name
     * @returns {void}
     */
    setActivity(activities: Array<Activity>, status: string): void {
        if(!activities) throw new TypeError("No activities provided!")
        this.ws?.send(JSON.stringify({
            op: 3,
            d: {
                since: Date.now(),
                activities: activities,
                status: status,
                afk: false
            }
        }))
    }

    /**
     * 
     * @returns {void}
     * @private
     */
    private listenEvents(): void {
        if(this.ws == null) return this.listenEvents();

        this.ws?.addEventListener("message", async (rawData) => {
            const data = JSON.parse(rawData.data)
            let camelData = EventUtil.snakeToCamelCase(data.d)

            if(camelData?.author?.id != null) {
                camelData["user"] = await (await fetch(`https://discord.com/api/v10/users/${camelData?.author?.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bot " + this.token,
                        "Content-Type": "application/json"
                    }
                }).catch((err) => {
                    throw new Error("[REST] " + err)
                })).json()
            }

            switch(data.t) {
                case "READY":
                    this.emitSync("ready", (camelData as ReadyEvent))
                    this.clientUser = camelData.user
                    break;
                case "MESSAGE_CREATE":
                    camelData = messageCreate(camelData, this)
                    this.emitSync("message", (camelData as MessageEvent))
                    break;
                case "GUILD_MEMBER_ADD":
                    camelData["guild"] = this.GuildManager.fetchGuild(camelData.guildId)
                    this.emitSync("guildMemberAdd", (camelData as GuildMemberAdd))
                    break;
                case "GUILD_MEMBER_REMOVE":
                    camelData["guild"] = this.GuildManager.fetchGuild(camelData.guildId)
                    this.emitSync("guildMemberRemove", (camelData as GuildMemberRemove))
                    break;    
                default:
                    console.log(data.t)
                    this.emitSync("debug", camelData)
                    if(data.op == 10) {
                        if(this.ws?.readyState == this.ws?.OPEN) this.heartbeat = setInterval(() => {
                            this.ws?.send(JSON.stringify({
                                "op": 1,
                                "d": 251
                            }))
                        }, data.d.heartbeat_interval)
                    }
                    break;
            }
        })
    }

    login(token: string | undefined) {
        if(!token) throw new TypeError("Token not specified")
        this.token = token
        this.ws = new WebSocket('wss://gateway.discord.gg')

        this.ws.addEventListener('open', () => {
            console.log("Connecting to Discord Gateway")
            this.ws?.send(JSON.stringify({
                op: 2,
                d: {
                    token: token,
                    properties: {
                        os: this.options.ws.properties.os,
                        browser: this.options.ws.properties.browser,
                        device: this.options.ws.properties.device
                    },
                    intents: 131071
                }
            }))
        })

        this.listenEvents()
    }
}