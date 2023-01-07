import express from 'express'
import controller from '../controllers/message'

const routers = express.Router()

routers.get('/status', controller.getStatus)
routers.get('/send', controller.sendMessageToPerson)


export default routers