import  sequelize  from "sequelize";
import { dataBaseConnection } from "../../../dataBase/index.js";

const userTypeModel = dataBaseConnection.define('userstypes',{
    userTypeId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userType: {
        type: sequelize.STRING
    },
    userTypeStatus: {
        type: sequelize.INTEGER
    }
},{
    timestamps: false
    
});

userTypeModel.sync();

export default userTypeModel;

