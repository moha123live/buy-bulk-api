const crypto = require("crypto");
const util = require("util");
const jwt = require("jsonwebtoken");

const scryptAsync = util.promisify(crypto.scrypt);

const hashPassword = async (password) => {
    try {
        const salt = crypto.randomBytes(16).toString("hex");
        const hashedBuffer = await scryptAsync(password, salt, 64);
        return `${salt}:${hashedBuffer.toString("hex")}`;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error(`Error hashing password: ${error.message}`);
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const [salt, hash] = hashedPassword.split(":");
        const hashedBuffer = await scryptAsync(password, salt, 64);
        return hash === hashedBuffer.toString("hex");
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};

const generateToken = (payload, options = {}) => {
    return jwt.sign(payload, process.env.SECRET_KEY, options);
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};
