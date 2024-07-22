import  sequelize  from "sequelize";
import { dataBaseConnection } from "../../../dataBase/index.js";


const categoryModel = dataBaseConnection.define("categories",{
    categoryId: {
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    categoryName: {
        type: sequelize.STRING
    },
    urlImage: {
        type: sequelize.STRING
    },
    status: {
        type: sequelize.INTEGER
    }
}, {
    timestamps: false
});

categoryModel.sync();

export default categoryModel;

