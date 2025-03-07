const Setting = require("../models/setting");

const getSetting = async (exclude = []) => {
    try {
        const settings =  await Setting.findOne({ attributes: { exclude } });
        return settings.toJSON();
    }
    catch (error) {
        throw new Error(`Error to fetch the settings - ${error}`);
    }
};

const updateSetting = async (id, data, transaction, exclude = []) => {
    try {
        const setting = await Setting.findByPk(id, {
            transaction,
            attributes: { exclude }
        });
        if (!setting) throw new Error("Setting not found");
        if (data.image === undefined) {
            delete data.image;
        }
        await setting.update(data, { transaction });
        return setting.toJSON();
    }
    catch (error) {
        throw new Error(`Error to updating the setting - ${error}`);
    }
};

module.exports = { getSetting, updateSetting};
