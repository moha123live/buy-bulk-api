const { indianDateAndTime } = require("./commonUtils");

const successResponse = (res, data = null, message = MESSAGES.OK, status = STATUS_CODES.OK) => {
    if(data?.updatedAt){
        data.updatedAt = indianDateAndTime(data.updatedAt);
    }
    return res.status(status).json({
        success: true,
        status,
        message,
        data,
        dateTime : indianDateAndTime(new Date().toLocaleString())
    });
};

const errorResponse = (res, message = MESSAGES.INTERNAL_SERVER_ERROR, status = STATUS_CODES.INTERNAL_SERVER_ERROR) => {
    return res.status(status).json({
        success: false,
        status,
        message,
        data: null,
        dateTime : indianDateAndTime(new Date().toLocaleString())
    });
};

module.exports = {
    successResponse,
    errorResponse
};