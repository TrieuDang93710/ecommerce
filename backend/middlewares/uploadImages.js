const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random + 1e9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
    }
})

const multerFilter = (req, file, cd) => {
    if (file.mimetype.startsWidth('image')) {
        cb(null, true)
    } else {
        cb({
            message: 'Unsupported file format'
        }, false)
    }
}

uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 }
})

const productImageResize = async (req, res, next) => {
    if (!req.files) {
        return next()
    }
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({quality: 90})
                .toArray(`public/images/product/${file.filename}`)
        })
    )
    next()
}

const blogImageResize = async (req, res, next) => {
    if (!req.files) {
        return next()
    }
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({quality: 90})
                .toArray(`public/images/blogs/${file.filename}`)
        })
    )
    next()
}

module.exports = { uploadPhoto, productImageResize, blogImageResize }