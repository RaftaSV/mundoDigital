import { Sequelize } from "sequelize";
import { dataBaseConnection } from "../../../dataBase/index.js";

const pageViewModel = dataBaseConnection.define("pageViews", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pageTitle: {
        type: Sequelize.STRING,
        allowNull: true
    },
    viewedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

pageViewModel.sync();

export default pageViewModel;
