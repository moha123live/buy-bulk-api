const settingService = require("../services/settingService");
const { successResponse, errorResponse } = require("../utils/responseUtils");
const { sequelize } = require("../../../config/database");
const { indianDateAndTime } = require("../utils/commonUtils");

const getSettings = async (req, res) => {
    const exclude = ["createdAt"];
    try {
        const { ...settings } = await settingService.getSetting(exclude);
        settings.updatedAt = indianDateAndTime(settings.updatedAt);
        return successResponse(res, settings);
    } catch (error) {
        return errorResponse(res, `Get settings error : ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const updateSetting = async (req, res) => {
    let transaction;
    const id = req.params.id;
    const body = { ...req.body};
    const exclude = ["createdAt"];
    try {
        transaction = await sequelize.transaction();
        const { ...settings } = await settingService.updateSetting(id, body, transaction, exclude);
        settings.updatedAt = indianDateAndTime(settings.updatedAt);
        await transaction.commit();
        return successResponse(res, settings);
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, `Update setting error : ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};


module.exports = {
    getSettings,
    updateSetting
};