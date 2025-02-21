const { errorResponse } = require("../utils/responseUtils");

const errorHandler = (err, req, res, next) => {
    return errorResponse(res);
};

module.exports = errorHandler;