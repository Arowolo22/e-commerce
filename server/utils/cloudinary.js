const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
     api_key:process.env.CLOUDINARY_API_KEY

});

module.exports = cloudinary;

