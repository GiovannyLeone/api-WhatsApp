import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { create, Whatsapp, Message, SocketState } from "venom-bot";

export type QRcode = {
    base64Qr: string
    asciiQR: string
    attempts: number
    urlCode?: string
}

class Sender {
    private client: Whatsapp;
    private connected: boolean
    private qr: QRcode

    
    public get isConnected() : boolean {
        return  this.connected
    }

    public get qrCode() : QRcode {
        return  this.qr
    }
    

    constructor() {
        this.initialize()
    }

    private initialize() {
        const qr = (
            base64Qr: string,
            asciiQR: string,
            attempts: number,
            ) => {
            this.qr = { base64Qr, asciiQR, attempts }
        }

        const status = (statusSession: string) => {
            /* isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail
            || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected
            || serverWssNotConnected || noOpenBrowser */

            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(
                statusSession
            )
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                 this.connected = state === SocketState.CONNECTED
            })
        }

        create('ws-sender-dev', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

    public async sendText(to: string, body: string) {
        // 55DDNumber@c.us
        // this.sendText("5511953580430@c.us", `Olá tudo bem este é teste do BOT do Giovanny`)
        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error("This number is not valid!");
        }

        let phoneNumber = parsePhoneNumber(to, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`

        console.log("phoneNumber", phoneNumber);


        await this.client.sendText(phoneNumber, body)
    }

}

export default Sender