import sequelize  from "sequelize";
import categoryModel from "../Categories/category.model.js"
import { dataBaseConnection } from "../../../dataBase/index.js";

const productsModel = dataBaseConnection.define("products", {
    productId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName : {
        type:sequelize.STRING,
    },
    model : {
        type: sequelize.STRING
    },
    urlImage : {
        type: sequelize.STRING
    },
    categoryId: {
        type: sequelize.INTEGER, 
        references: {
            model: 'categories',
            key: 'categoryId'
        }
    },
    quantity: {
        type: sequelize.INTEGER
    },
    price : {
        type: sequelize.FLOAT
    },
    cost: {
        type: sequelize.FLOAT
    },
    description: {
        type: sequelize.TEXT
    },
    status : {
        type: sequelize.INTEGER
    }

}, {
    timestamps: false
});

productsModel.belongsTo(categoryModel,{
    foreignKey: 'categoryId'
});

categoryModel.hasMany(productsModel, {
    foreignKey: 'categoryId'
});

productsModel.sync();

export default productsModel;