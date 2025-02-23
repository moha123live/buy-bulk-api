const User = require("../models/user");

const getUserByWhere = async (whereCondition = {}, exclude = []) => {
    try {
        const user = await User.findOne({
            where: whereCondition,
            attributes: { exclude }
        });
        return user;
    }
    catch (error) {
        throw new Error(`Error to fetch the user data : ${error}`);
    }
};

const createUser = async (data, transaction) => {
    try {
        return await User.create(data, { transaction });
    }
    catch (error) {
        throw new Error(`Error to create a user: ${error}`);
    }
};

module.exports = { getUserByWhere, createUser};
