import categoryModel from "../Categories/category.model.js";
import productsModel from "./product.model.js";

export const getProductByCategoryId = async (req, res) => {

    try {
        
        const {categoryId} = req.params;

        const products = await productsModel.findAll({
            where: {
                categoryId,
                status: 0
            },
            include : [
                categoryModel
            ]
        })

        return res.status(200).json({
            products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error obteniendo los productos'
        });
    }
}

export const getProductById = async (req, res) => {
    const {productId} = req.params;

    try {

        const data = await productsModel.findByPk(productId);

        return res. status(200).json({
            data
        })
         
    } catch (error) {
        return res.status(500).json({
            message: 'error obteniendo el producto'
        })
    }
}

export const insertProduct = async (req, res) => {
    try {
        const {
            productName,
            model,
            urlImage,
            categoryId,
            quantity,
            price,
            description
        } = req.body;

        if (!productName || !model || !urlImage || !categoryId || !quantity || !price || !description) {
            return res.status(400).json({
                message: 'Faltan datos para insertar el producto'
            });
        }
        
        const category = await categoryModel.findByPk(categoryId);

        if (!category) {
            return res.status(400).json({
                message: 'error la categoria no existe'
            })
        }

        const newProduct = {
            productName,
            model,
            urlImage,
            categoryId,
            quantity,
            price,
            description,
            status:0
        }

        await productsModel.create(newProduct);

        return res.status(200).json({
            message:'Producto insertado con exito'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error insertando el producto'
        })
    }
}