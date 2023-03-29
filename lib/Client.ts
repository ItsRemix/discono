import "https://deno.land/std@0.181.0/dotenv/load.ts";
import { EventEmitter } from "https://deno.land/x/eventemitter@1.2.4/mod.ts"
import { ClientOptions } from "./types/ClientOptions.ts";
import { ReadyEvent } from "./types/Events/ReadyEvent.ts";
import { MessageEvent } from "./types/Events/MessageEvent.ts";
import Util from "./Util/Config.ts";
import EventUtil from "./Util/Events.ts";

// deno-lint-ignore no-explicit-any
export default class Client extends EventEmitter<{ ready (data: ReadyEvent): any, message (data: MessageEvent): any }> {
    options: ClientOptions
    ws: WebSocket | null
    heartbeat: number | null

    constructor(options?: ClientOptions) {
        super()
        if(options == null) this.options = Util.createDefaultOptions();
        else this.options = options;

        this.ws = null
        this.heartbeat = null
    }

    setActivity(): void {

    }

    listenEvents(): void {
        if(this.ws == null) return this.listenEvents();

        this.ws?.addEventListener("message", (rawData) => {
            const data = JSON.parse(rawData.data)
            const camelData = EventUtil.snakeToCamelCase(data.d)

            switch(data.t) {
                case "READY":
                    this.emitSync("ready", (camelData as ReadyEvent))
                    break;
                case "MESSAGE_CREATE":
                    this.emitSync("message", (camelData as MessageEvent))
                    break;
                default:
                    if(data.op == 10) {
                        this.heartbeat = setInterval(() => {
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
        if(!token) throw new TypeError("Token not specified");
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