const express = require('express')
const dbConnect = require('./config/dbConnect')
const authRoute = require('./routers/userRoute')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000

dbConnect().catch(console.dir)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// get api for register and login
app.use('/api/user/', authRoute)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`)
})