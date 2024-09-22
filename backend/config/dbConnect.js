const {default: mongoose} = require('mongoose')

const dbConnect = async function run() {
    try {
        const connDB = mongoose.connect('mongodb://localhost:27017/ecommerces')
        console.log('Database connected successful')
    } catch {
        console.log('Error')
    }
}


module.exports = dbConnect
