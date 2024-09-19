import sequelize from 'sequelize';
import { dataBaseConnection } from "../../../dataBase/index.js";
import InvoiceModel from '../Invoices/invoice.model.js';
import productsModel from '../Products/product.model.js';

const InvoiceDetailModel = dataBaseConnection.define('invoicesdetails', {
  invoiceDetailId: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  invoiceId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'invoices', 
      key: 'invoiceId'    
    }
  },
  productId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'productId'   
    }
  },
  cant: {
    type: sequelize.INTEGER
  },
  unitPrice: {
    type: sequelize.DECIMAL(10, 4)
  },
  totalAmount: {
    type: sequelize.DECIMAL(10, 4)
  },
  unitCost: {
    type: sequelize.DECIMAL(10, 4)
  },
  invoiceDetailStatus: {
    type: sequelize.INTEGER
  }
}, {
  indexes: [
    {
      name: 'invoiceIdIndex',
      fields: ['invoiceId']
    }
  ],

});

InvoiceDetailModel.belongsTo(InvoiceModel,{
  foreignKey: 'invoiceId'
});

InvoiceModel.hasMany(InvoiceDetailModel, {
    foreignKey: 'invoiceId'
});


InvoiceDetailModel.belongsTo(productsModel, {
  foreignKey: 'productId'
});
productsModel.hasMany(InvoiceDetailModel,{
  foreignKey: 'productId'
});

InvoiceDetailModel.sync();

export default InvoiceDetailModel;
