const express = require(`express`)
const dotenv = require(`dotenv`).config()
const app = express()
const mongoose = require(`mongoose`)
const port = process.env.port
app.use(express.json())
const router = require(`./router/userRouter`)
app.use(router)

mongoose.connect(process.env.db).then(()=>{
    app.listen(port,()=>{
        console.log(`App is connected & running on port: ${port}`);
    })
    console.log(`Connection to the Database has been established successfully.`);
}).catch((e)=>{
    console.log(`Unable to connect to the Database because: ${e}`);
})
