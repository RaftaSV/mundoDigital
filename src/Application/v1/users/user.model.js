import  sequelize  from "sequelize";
import { dataBaseConnection } from "../../../dataBase/index.js";
import userTypeModel from "../UserTypes/userType.model.js";
const   userModel = dataBaseConnection.define("users", {
   
    userId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    fullName: {
        type: sequelize.STRING
    },
    address: {
        type: sequelize.STRING 
    },
    email: {
        type: sequelize.STRING
    },
    phoneNumber : {
        type: sequelize.STRING
    },
    userPassword: {
        type: sequelize.STRING
    },
    userTypeId:{
        type: sequelize.INTEGER,
        references: {
            model: 'usersTypes',
            key: 'userTypeId'
        }
    },
    status: {
        type:sequelize.INTEGER
    }
}, {
    timestamps: false
});

userModel.belongsTo(userTypeModel,{
    foreignKey: 'userTypeId'
});

userTypeModel.hasMany(userModel, {
    foreignKey: 'userTypeId'
})

userModel.sync();
export default userModel;