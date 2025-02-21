const dotenv = require("dotenv");
const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({path:env});