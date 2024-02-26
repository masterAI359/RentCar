import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.mongo_uri)
.then(console.log("connected"))
.catch(error => console.error(error))



const App = express()

App.listen(3000,()=> {
    console.log('server listening !')
})