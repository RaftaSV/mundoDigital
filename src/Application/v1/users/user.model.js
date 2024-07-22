import  sequelize  from "sequelize";
import { dataBaseConnection } from "../../../dataBase/index.js";

const userModel = dataBaseConnection.define("Users", {
   
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
    userPassword: {
        type: sequelize.STRING
    },
    status: {
        type:sequelize.INTEGER
    }
}, {
    timestamps: false
});

userModel.sync();
export default userModel;