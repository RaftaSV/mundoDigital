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
            description,
            cost
        } = req.body;

        if (!cost || !productName || !model || !urlImage || !categoryId || !quantity || !price || !description) {
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
            cost,
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


export const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        const {
            productName,
            model,
            urlImage,
            categoryId,
            quantity,
            price,
            description,
            cost
        } = req.body;

        if (!cost || !productName || !model || !urlImage || !categoryId || !quantity || !price || !description) {
            return res.status(400).json({
                message: 'Faltan datos para actualizar el producto'
            });
        }

        const product = await productsModel.findByPk(
            productId
        )

        if (product) {
            product.productName = productName;
            product.model = model;
            product.urlImage = urlImage;
            product.categoryId = categoryId;
            product.quantity = quantity;
            product.price = price;
            product.description = description;
            product.cost = cost;
            await product.save();

            res.status(200).json({
                message: `Producto ${productName} actualizado con exito`
            })
        } else {
            res.status(400).json({
                message: `Producto no encontrado`
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Error no se pudo acctualizar el producto ${error.message}`
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const {
            productId
        } = req.params;

        if (!productId){
            res.status(400).json({
                message: `Faltan datos para eliminar el producto`
            })
        }

        const product = await productsModel.findByPk(
            productId
        )

        if(product) {
            product.status= 1;
            await product.save();
            res.status(200).json({
                message: `El producto ${product.dataValues.productName} fue eliminado con exito`
            })
        }else {

            res.status(401).json({
                message: `El producto no fue encontrado`
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Error eliminando el producto ${error.message}`
        })
    }
}