import http from 'http';
import express, { Request, Response } from "express"
import routers from './routers/message';
// import Sender from "./sender"
// const sender = new Sender()

const router  = express()

// Fazendo com que a body receba requições POST
router.use(express.urlencoded({ extended: false }))

// Fazendo que as respostas da API sejam em Json
router.use(express.json())

// Fazendo com que o Router apos a "/", utilize as Routes
router.use('/', routers)

const server = http.createServer(router)
server.listen('3333', () => console.log("Server Started"))