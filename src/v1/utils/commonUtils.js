const indianDateAndTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2); // Ensure two-digit formatting for minutes
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = ("0" + hours % 12 || 12).slice(-2);;
    const formattedDateTimeString = `${day}-${month}-${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
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