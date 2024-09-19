import { Mutex }  from 'async-mutex';
import InvoiceModel from './invoice.model.js';
import productsModel from '../Products/product.model.js';
import sequelize, { Op }  from 'sequelize';
import cartModel from '../CartProduct/cart.model.js';
import InvoiceDetailModel from '../detailsInvoice/detailinvoice.model.js'
import { dataBaseConnection } from "../../../dataBase/index.js";
import {getDate, getTime } from '../../../utils/GetDate.js'
import userModel from '../users/user.model.js';


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
      details: invoice?.invoicesdetails?.map((detail) => ({
        product: detail.product.productName,
        img: detail.product.urlImage,
        quantity: detail.cant,
        unitPrice: detail.unitPrice,
        unitCost: detail.unitCost,
        totalAmount: detail.totalAmount,
      })),
    }));


    invoices?.forEach(detail => {
      detail.invoicedetails?.forEach(details=>{
        console.log(details)
      })
   });

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