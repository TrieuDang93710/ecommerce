const express = require('express')
const dbConnect = require('./config/dbConnect')
const authRoute = require('./routers/userRoute')
const productRoute = require('./routers/productRoute')
const blogRoute = require('./routers/blogRoute')
const categoryRoute = require('./routers/categoryRoute')
const blogCateRoute = require('./routers/blogCateRoute')
const brandRoute = require('./routers/brandRoute')
const couponRoute = require('./routers/couponRoute')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000

dbConnect().catch(console.dir)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// get api for register and login
app.use('/api/user/', authRoute)
app.use('/api/product/', productRoute)
app.use('/api/blog/', blogRoute)
app.use('/api/category', categoryRoute)
app.use('/api/blog-category', blogCateRoute)
app.use('/api/brand', brandRoute)
app.use('/api/coupon', couponRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`)
})