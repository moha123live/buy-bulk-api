const messageService = require("../services/messageService");
const { successResponse, errorResponse } = require("../utils/responseUtils");
const { sequelize } = require("../../../config/database");
const { indianDateAndTime } = require("../utils/commonUtils");


const createMessage = async (req, res) => {
    let transaction;
    const data = { ...req.body };
    try {
        transaction = await sequelize.transaction();
        const { ...messageData }  = await messageService.createMessage(data, transaction);
        delete messageData.createdAt; 
        delete messageData.updatedAt; 
        await transaction.commit();
        return successResponse(res, messageData, "Message " + MESSAGES.CREATED, STATUS_CODES.CREATED);
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, `Create message error : ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const getAllMessages = async (req, res) => {
    const exclude = ["updatedAt"];
    try {
        const { messages, totalCount } = await messageService.getAllMessages(exclude);
        const messagesData = messages.map(message => {
            const { ...messageData } = message.toJSON();
            if (messageData.image) {
                messageData.image = `data:image/jpeg;base64,${messageData.image.toString("base64")}`;
            }
            messageData.createdAt = indianDateAndTime(messageData.createdAt);
            return messageData;
        });
        return successResponse(res, { messages: messagesData, totalCount });
    } catch (error) {
        return errorResponse(res, `Get all messages error : ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const deleteMessage = async (req, res) => {
    let transaction;
    const id = req.params.id;
    try {
        transaction = await sequelize.transaction();
        await messageService.deleteMessage(id, transaction);
        await transaction.commit();
        return successResponse(res, null, "Message deleted successfully");
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, error.message, STATUS_CODES.BAD_REQUEST);
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    deleteMessage
};