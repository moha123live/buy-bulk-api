const Message = require("../models/message");

const getAllMessages = async (exclude = []) => {
    try {
        const [messages, totalCount] = await Promise.all([
            Message.findAll({ attributes: { exclude }, order: [['createdAt', 'DESC']] }),
            Message.count()
        ]);

        return { messages, totalCount };
    }
    catch (error) {
        throw new Error(`Error to fetch all the messages list - ${error}`);
    }
};

const createMessage = async (data, transaction) => {
    try {
        const message = await Message.create(data, {
            transaction
        });
        return message.toJSON();
    }
    catch (error) {
        throw new Error(`Error to create the message - ${error}`);
    }
};

const deleteMessage = async (id, transaction) => {
    try {
        const deletedMessage = await Message.destroy({
            where: { id },
            transaction
        });
        if (deletedMessage === 0) throw new Error("Message not found");
        return;
    } catch (error) {
        throw new Error(`Error to delete the message - ${error}`);
    }

};

module.exports = { getAllMessages, createMessage, deleteMessage };
