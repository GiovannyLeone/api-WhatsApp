import express, { Request, Response } from "express"
import { send } from "process"

import Sender from "../sender"
const sender = new Sender()


const getStatus = async (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected
    })
}

const sendMessageToPerson = async (req: Request, res: Response) => {
    const { number, message } = req.body

    try {
        //validar os dados

        await sender.sendText(number, message)
        return res.status(200).json({
            message: "Mensagem enviada com sucesso!"
        })
    } catch (error) {
        console.error("error", error)
        res.status(500).json({ status: "error", message: error })
    }

}


export default { getStatus, sendMessageToPerson }