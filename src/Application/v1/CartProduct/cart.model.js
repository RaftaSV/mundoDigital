import sequelize  from "sequelize";
import productsModel from "../Products/product.model.js";
import userModel from "../users/user.model.js";
import { dataBaseConnection } from "../../../dataBase/index.js";

export const cartModel = dataBaseConnection.define("shoppingcarts", {
    cartId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'userId'
        }

    },
    productId: {
        type: sequelize.INTEGER,
        references: {
            model: 'products',
            key: 'productId'
        }
    },
    cartStatus : {
        type: sequelize.INTEGER
    },
});

cartModel.belongsTo(userModel,{
    foreignKey:'userId'
})

userModel.hasMany(cartModel, {
    foreignKey:'userId' 
})

cartModel.belongsTo(productsModel,{
    foreignKey:'productId'
})
productsModel.belongsTo(cartModel,{
    foreignKey: 'productId'
});

cartModel.sync();

export default cartModel;