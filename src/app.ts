import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.get('/', (req:Request, res: Response) => {
  res.send('Hello World!')
})

export default app