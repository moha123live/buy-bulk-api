const { hashPassword, comparePassword, generateToken } = require("../utils/authUtils");
const { successResponse, errorResponse } = require("../utils/responseUtils");
const userService = require("../services/userService");
const { indianDateAndTime } = require("../utils/commonUtils");
const { sequelize } = require("../../../config/database");


const login = async (req, res) => {
    const { email, password: loginPassword } = req.body;
    const whereCondition = { email };
    const exclude = ["createdAt"];
    try {
        const user = await userService.getUserByWhere(whereCondition, exclude);
        if (!user || !(await comparePassword(loginPassword, user.password))) return errorResponse(res, MESSAGES.INVALIDUSER, STATUS_CODES.UNAUTHORIZED);
        const token = generateToken({ userId: user.id, email: user.email }, { expiresIn: "12h" });
        const { password, ...userData } = user.toJSON();
        userData.updatedAt = indianDateAndTime(userData.updatedAt);
        return successResponse(res, { userData, token }, MESSAGES.OK, STATUS_CODES.OK);
    } catch (error) {
        return errorResponse(res, `Login error - ${error}`);
    }
}

const register = async (req, res) => {
    
    let transaction;
    const { email, password, name, phoneNumber, isActive } = req.body;
    const whereCondition = { email };
    const exclude = ["password", "createdAt"];
    try {
        const existingUser = await userService.getUserByWhere(whereCondition, exclude);
        if (existingUser) return errorResponse(res, MESSAGES.USEREXISTS, STATUS_CODES.BAD_REQUEST);
        transaction = await sequelize.transaction();
        const hashedPassword = await hashPassword(password);
        const userData = await userService.createUser({ email, password: hashedPassword, name, phoneNumber, isActive }, transaction);
        await transaction.commit();
        return successResponse(res, null, `User ${MESSAGES.CREATED}`, STATUS_CODES.CREATED);
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, `Register error - ${MESSAGES.REGISTER_FAILED} `);
    }
};

module.exports = {
    login,
    register
};