import productsModel from '../Products/product.model.js';
import cartModel from './cart.model.js';

export const getCartByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            req.status(400).json({
                message: `Datos necesarios para la busqueda incompletos`
            })
        }
    
        const cartUser = await cartModel.findAll({
            where: {
                userId,
                cartStatus: 0
            },
            include : [
                {
                    model: productsModel,
                    attributes: ['productId', 'productName', 'price', 'urlImage']
                }
            ]
        })

        res.status(200).json({
            cartUser
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: `Error al obtener los productos del carrito ${error.message}`
        })
    }
}

export const insertCartUser = async (req, res) => {
    try {
        const {userId, productId} = req.body;

        if (!userId || !productId) {
            res.status(400).json({
                message: 'Faltan datos para agregar al acarrito de compras'
            })
        }

        const newCart = {
            userId, productId, cartStatus :0
        }

        await cartModel.create(newCart);

        const cartUser = await cartModel.findAll({
            where: {
                userId,
                cartStatus: 0
            },
            include : [
                {
                    model: productsModel,
                    attributes: ['productId', 'productName', 'price', 'urlImage']
                }
            ]
        })
        res.status(200).json({
            message: 'Agregado al carrito',
            cartUser
        })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message: `Error agregarndo el producto al carrito ${error.message}`
    })
}
}


export const deleteProductCart = async (req, res) => {
    try {
        const {
            cartId 
        } = req.params;

    
        if (!cartId) {
            res.status(400).json({
                message: 'fantan datos para eliminar el produco del carrito'
            })
        }

        const cart = await cartModel.findByPk(cartId);

        if(!cart) {
            res.status(400).json({
                message: 'No se encontraron datos del carrito'
            })
        }

        cart.cartStatus = 1;
        await cart.save();
        const cartUser = await cartModel.findAll({
            where: {
                userId: cart.dataValues.userId,
                cartStatus: 0
            },
            include : [
                {
                    model: productsModel,
                    attributes: ['productId', 'productName', 'price', 'urlImage']
                }
            ]
        })
        res.status(200).json({
            message:'El producto se elimino del carrito con exito',
            cartUser
        })

    } catch (error) {
        console.log(error);
    res.status(500).json({
        message: `Error eliminando  el producto del carrito ${error.message}`
    })
    }
}