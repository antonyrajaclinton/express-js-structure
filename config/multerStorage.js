import multer from "multer";


function productFileUpload() {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/PROJECTS/express-js-structure/public/uploads/products')
        },
        filename: function (req, file, cb) {
            let originalName = file.originalname.split('.');
            let fileType = originalName[(originalName.length - 1)];
            cb(null, file.fieldname + '-' + Date.now() + '.' + fileType)
        }
    })
}

export { productFileUpload }