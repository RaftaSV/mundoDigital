import { Mutex }  from 'async-mutex';
import InvoiceModel from './invoice.model.js';
import productsModel from '../Products/product.model.js';
import sequelize, { Op, col, fn }  from 'sequelize';
import cartModel from '../CartProduct/cart.model.js';
import InvoiceDetailModel from '../detailsInvoice/detailinvoice.model.js'
import { dataBaseConnection } from "../../../dataBase/index.js";
import {getDate, getTime } from '../../../utils/GetDate.js'
import userModel from '../users/user.model.js';
import moment from 'moment';


const mutex = new Mutex();


export const getInvoicesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({ message: 'Fecha es requerida en el formato YYYY-MM-DD.' });
    }

    const invoices = await InvoiceModel.findAll({
      where: {
        invoiceDate: {
          [Op.eq]: date, 
        },
      },
      include: [
        {
          model: userModel,
          attributes: ['fullName', 'email','address'],
        },
        {
          model: InvoiceDetailModel,
          include: [
            {
              model: productsModel,
              attributes: ['productName', 'price', 'urlImage'],
            },
          ],
        },
      ],
      order: [['invoiceTime', 'ASC']], 
    });


    const formattedInvoices = invoices?.map((invoice) => ({
      invoiceId: invoice.invoiceId,
      date: invoice.invoiceDate,
      time: invoice.invoiceTime,
      client: invoice.user.fullName,
      total: invoice.totalAmount,
      details: invoice?.invoicesdetails?.map((detail) => (        {
        product: detail.product.productName,
        img: detail.product.urlImage,
        quantity: detail.cant,
        unitPrice: detail.unitPrice,
        unitCost: detail.unitCost,
        totalAmount: detail.totalAmount,
      })),
    }));


    res.status(200).json({ invoices: formattedInvoices });
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    res.status(500).json({ message: 'Error al obtener las facturas.' });
  }
}



export const insertInvoice = async (req, res) => {
    const transaction = await dataBaseConnection.transaction();
    const release = await mutex.acquire();
    try {

        const {
            userId,
            cart,
            totalPrice
        } = req.body;


        if (!userId || !cart || !totalPrice) {
            res.status(401).json({
                message: 'Error falta datos para la factura'
              });
        }

        const newInvoice = {
            userId,
            invoiceDate: getDate().date,
            invoiceTime: getTime().currentTime,
            totalAmount: totalPrice,
            totalCash:0,
            invoiceChange:0,
            invoiceStatus: 0
        }
        const invoice = await InvoiceModel.create(newInvoice, { transaction });
        const invoiceId = invoice.invoiceId;
        
        let newInvoiceDetail = cart.map(detail =>({
            invoiceId,
            productId: detail.productId,
            cant:1,
            unitPrice: detail.product.price, 
            unitCost: detail.product.cost,
            totalAmount: detail.product.price,
            invoiceDetailStatus:0
        }));

        await InvoiceDetailModel.bulkCreate(newInvoiceDetail, {transaction});
        
        await Promise.all(cart.map(detail =>
            productsModel.update({
                quantity: sequelize.literal(`quantity - ${1}`),
            }, {
                where:{
                    productId: detail.productId
                },
                transaction
            })
        ));

        await Promise.all(cart.map(detail =>
            cartModel.update({
                cartStatus: 1,
            }, {
                where:{
                    cartId: detail.cartId
                },
                transaction
            })
        ));
        await transaction.commit();
    release();
    return res.status(201).json({
      message: 'Factura creada correctamente',
      data: invoice
    });

    } catch(error) {
        transaction.rollback();
        console.log(error);
        res.status(500).json({
            message: `Error insertando factura ${error.message}`
        })
        
    }
}


export const getInformation = async (req, res) => {
  try {
    const { date } = req.params;
    const startOfMonth = moment(date).startOf('month').toDate();
    const endOfMonth = moment(date).endOf('month').toDate();
    const startOfLastMonth = moment(startOfMonth).subtract(1, 'month').toDate();
    const endOfLastMonth = moment(endOfMonth).subtract(1, 'month').toDate();

    let monthlySales = await InvoiceModel.findAll({
      attributes: [
        [fn('Date', col('invoiceDate')), 'date'],
        [fn('SUM', col('totalAmount')), 'totalAmount'],
      ],
      where: {
        invoiceDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        invoiceStatus: 0,
      },
      group: [fn('DATE', col('invoiceDate'))],
      raw: true,
    });

    let totalMonthlySales = await InvoiceModel.findAll({
      attributes: [[fn('SUM', col('totalAmount')), 'totalAmount']],
      where: {
        invoiceDate: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        invoiceStatus: 0,
      },
      raw: true,
    });

    let totalLastMonthlySales = await InvoiceModel.findAll({
      attributes: [[fn('SUM', col('totalAmount')), 'totalAmount']],
      where: {
        invoiceDate: {
          [Op.between]: [startOfLastMonth, endOfLastMonth],
        },
        invoiceStatus: 0,
      },
      raw: true,
    });

    // Validar el valor de totalAmount y reasignar a 0 si corresponde
    totalMonthlySales =
      totalMonthlySales[0]?.totalAmount === null ? 0 : totalMonthlySales[0].totalAmount;

    totalLastMonthlySales =
      totalLastMonthlySales[0]?.totalAmount === null ? 0 : totalLastMonthlySales[0].totalAmount;

    // Validar el array de ventas mensuales y reasignar a null si está vacío
    monthlySales = monthlySales.length ? monthlySales : 0;

    // Calcular el porcentaje de diferencia
    let percentageDifference;

    if (parseFloat(totalMonthlySales) === 0 && parseFloat(totalLastMonthlySales) === 0) {
      percentageDifference = 0;
    } else if (parseFloat(totalLastMonthlySales) === 0) {
      percentageDifference = parseFloat(totalMonthlySales) > 0 ? 100 : -100;
    } else if (parseFloat(totalMonthlySales) === 0) {
      percentageDifference = -100;
    } else {
      percentageDifference = ((parseFloat(totalMonthlySales) - parseFloat(totalLastMonthlySales)) / parseFloat(totalLastMonthlySales)) * 100;
    }
    
    percentageDifference = (percentageDifference.toFixed(2).toString() + '%')
    res.status(200).json({
      monthlySales,
      totalMonthlySales,
      totalLastMonthlySales,
      percentageDifference,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error obteniendo los datos ${error}`,
    });
  }
};




