import categoryModel from "./category.model.js"
 export const getCategories = async (req, res) => {

    try {
        const categories = await categoryModel.findAll({
            where : {
                status: 0
            }
        })
        return res.status(200).json({
            categories
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error obteniendo las categorias'
        })
    }

}

export const insertCategories = async(req, res) => {
    try {

        const {
            categoryName,
            urlImage
        } = req.body;

        if (!categoryName || !urlImage) {

            return res.status(401).json({
                message: 'Faltan datos para insertar la categoria'
            })
        }

        const newCategory = {
            categoryName,
            urlImage,
            status: 0
        }

        await categoryModel.create(newCategory);

        return res.status(200).json({
            message: `Catetegoria ${categoryName} creada con exito`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error insertando la categoria'
        })
    }
} 