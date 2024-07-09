// just for test environment
const dotenv = require("dotenv");
const path = require("path");
const envFilePath = path.resolve(__dirname, '..', '.env.test');
dotenv.config({ path: envFilePath });

const config = {
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.JWT_SECRET
};

module.exports = config;