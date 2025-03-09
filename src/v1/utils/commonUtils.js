const indianDateAndTime = (isoDateString) => {
    const utcDate = new Date(isoDateString);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const date = new Date(utcDate.getTime() + istOffset);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = ("0" + (hours % 12 || 12)).slice(-2);
    const formattedDateTimeString = `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`
    return formattedDateTimeString;
};

const encrypt = (text) => {
    const crypto = require("crypto");
    const cipher = crypto.createCipheriv("aes-256-cbc", process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

const decrypt = (encryptedtext) => {
    const crypto = require("crypto");
    const decipher = crypto.createDecipheriv("aes-256-cbc", process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
    let decrypted = decipher.update(encryptedtext, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { indianDateAndTime, encrypt, decrypt };