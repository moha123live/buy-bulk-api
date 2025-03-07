const Product = require("../models/product");

const getAllProducts = async (exclude = []) => {
    try {
        const [products, totalCount] = await Promise.all([
            Product.findAll({ attributes: { exclude }, order: [['createdAt', 'ASC']] }),
            Product.count()
        ]);

        return { products, totalCount };
    }
    catch (error) {
        throw new Error(`Error to fetch all the products list - ${error}`);
    }
};

const getProductById = async (id, exclude = []) => {
    try {
        const product =  await Product.findByPk(id, {
            attributes: { exclude }
        });
        return product.toJSON();
    }
    catch (error) {
        throw new Error(`Error to fetch the single product detail - ${error}`);
    }
};

const createProduct = async (data, transaction) => {
    try {
        const product = await Product.create(data, {
            transaction
        });
        return product.toJSON();
    }
    catch (error) {
        throw new Error(`Error to create the product - ${error}`);
    }
};

const updateProduct = async (id, data, transaction, exclude = []) => {
    try {
        const product = await Product.findByPk(id, {
            transaction,
            attributes: { exclude }
        });
        if (!product) throw new Error("Product not found");
        if (data.image === undefined) {
            delete data.image;
        }
        await product.update(data, { transaction });
        return product.toJSON();
    }
    catch (error) {
        throw new Error(`Error to updating the product - ${error}`);
    }
};

// const updateProduct = async (id, data, transaction, exclude = []) => {
//     try {
//         const updatedRows = await Product.update(data, {
//             where: { id },
//             transaction,
//             attributes: { exclude }
//         });

//         if (updatedRows[0] === 0) throw new Error("Product not found or no changes made");

//         return getProductById(id, exclude);
//     } catch (error) {
//         throw new Error(`Error updating the product - ${error}`);
//     }
// };

const deleteProduct = async (id, transaction) => {
    try {
        const deletedProduct = await Product.destroy({
            where: { id },
            transaction
        });
        if (deletedProduct === 0) throw new Error("Product not found");
        return;
    } catch (error) {
        throw new Error(`Error to delete the product - ${error}`);
    }

};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
