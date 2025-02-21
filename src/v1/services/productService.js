const Product = require("../models/product");

const getAllProducts = async (exclude = []) => {
    try {
        return await Product.findAll({
            attributes: { exclude }
        });
    }
    catch {
        throw new Error("Error to fetch the Product list")
    }
};

const getProductById = async (id, exclude = []) => {
    try {
        const product =  await Product.findByPk(id, {
            attributes: { exclude }
        });
        return product.toJSON();
    }
    catch {
        throw new Error("Error to fetch the Product details")
    }
};

const createProduct = async (data, transaction) => {
    try {
        const product = await Product.create(data, {
            transaction
        });
        return product.toJSON();
    }
    catch( error) {
        throw new Error(error);
    }
};

const updateProduct = async (id, data, transaction, exclude = []) => {
    try {
        const product = await Product.findByPk(id, {
            transaction,
            attributes: { exclude }
        });
        if (!product) throw new Error("Product not found");
        await product.update(data, { transaction });
        return product.toJSON();
    }
    catch {
        throw new Error("Error to updating the Product");
    }
};

const deleteProduct = async (id, transaction) => {
    try {
        const deletedProduct = await Product.destroy({
            where: { id },
            transaction
        });
        if (deletedProduct === 0) throw new Error("Product not found");
        return;
    } catch (error) {
        throw new Error( error);
    }

};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
