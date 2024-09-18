import sequelize from 'sequelize';
import { dataBaseConnection } from "../../../dataBase/index.js";

const InvoiceModel = dataBaseConnection.define('Invoice', {
  invoiceId: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'userId'   
    }
  },
  branchId: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0  
  },
  invoiceDate: {
    type: sequelize.DATEONLY,  
  },
  invoiceTime: {
    type: sequelize.TIME, 
  },
  totalAmount: {
    type: sequelize.DECIMAL(10, 4),
  },
  totalCash: {
    type: sequelize.DECIMAL(10, 4),
  },
  invoiceChange: {
    type: sequelize.DECIMAL(10, 4),
  },
  invoiceStatus: {
    type: sequelize.INTEGER,
  }
}, {
  indexes: [
    {
      name: 'invoiceDateIndex',
      fields: ['invoiceDate']
    }
  ],
  tableName: 'invoices', 
});

InvoiceModel.sync();

export default InvoiceModel;
