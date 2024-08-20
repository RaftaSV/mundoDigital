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
        const verifyCategory = await categoryModel.findOne({
            where : {
                categoryName
            }
        })

        if (verifyCategory) {

            if(verifyCategory.dataValues.status === 0 ){
                res.status(400).json({
                    message: `La categoria ${categoryName} ya existe`
                })
            }
            else {
                verifyCategory.status = 0;
                await verifyCategory.save();
                res.status(200).json({
                    message: `La categoria ${categoryName} estaba eliminada, activada con exito`
                })
            }
        } else {

        await categoryModel.create(newCategory);

        return res.status(200).json({
            message: `Catetegoria ${categoryName} creada con exito`
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'error insertando la categoria'
        })
    }
} 


export const updateCategory = async (req, res) => {

    try {
        const {categoryId} = req.params;

        const {
            categoryName,
            urlImage
        } = req.body;

        if (!categoryId || !categoryName || !urlImage) {
            res.status(400).json({
                message: `Error faltan datos para actualizar la categoria`
            })
        }

        const category = await categoryModel.findByPk(
            categoryId
        )
    
        if (!category) {
            res.status(404).json({
                message: `Error no se encontro la categoria`
            }) 
        }

        const verifyCategory = await categoryModel.findOne({
            where : {
                categoryName
            }
        })

        if (verifyCategory){
            if (verifyCategory.dataValues.categoryId === parseInt(categoryId)) {
                category.categoryName = categoryName
                category.urlImage = urlImage
                await category.save();
                res.status(200).json({
                    message: `Catetegoria ${categoryName} actualizada correctamente`
                })
            } else {
                res.status(400).json({
                    message: `La catetegoria ${categoryName} ya existe`
                })
            }
        } else {
        category.categoryName = categoryName
        category.urlImage = urlImage
        await category.save();
        res.status(200).json({
            message: `Catetegoria ${categoryName} actualizada correctamente`
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `error actualizando la categoria ${error.message}`
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {

        const {categoryId} = req.params;

        if (!categoryId) {
            res.status(401).json({
                message: `Faltan datos para eliminar la categoria`
            })
        }

        const category = await categoryModel.findByPk(
            categoryId
        )

        if (!category) {
            res.status(401).json({
                message: `no se encontro la categoria`
            }) 
        } 

        category.status = 1;
        await category.save();

        res.status(200).json({
            message: `Categoria ${category.categoryName} eliminada con exito`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Error eliminando la categoria`
        })
    }
}