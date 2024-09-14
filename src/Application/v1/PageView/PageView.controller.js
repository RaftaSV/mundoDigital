import sequelize from "sequelize";
import pageViewModel from "./PageView.model.js";

export const insertPageView = async (req, res) => {
    try {
        const { pageUrl, pageTitle } = req.body;

 
        await pageViewModel.create({
            pageUrl,
            pageTitle,
            viewedAt: new Date()
        });

        res.status(201).json({
            message: 'Vista de la pagina creada con exito',
        });
    } catch (error) {
        console.error('Error insertando vista:', error);
        res.status(500).json({
            message: 'Error insertando vista'
        });
    }
};
// Asegúrate de tener el modelo importado correctamente

export const getPageViews = async (req, res) => {
    try {
        const totalViews = await pageViewModel.count();
        const viewsByUrl = await pageViewModel.findAll({
            attributes: [
                'pageUrl',
                [sequelize.fn('COUNT', sequelize.col('id')), 'totalViews']
            ],
            group: ['pageUrl'],
            order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
        });

        res.status(200).json({
            totalViews,  
            viewsByUrl 
        });
    } catch (error) {
        console.error('Error ', error);
        res.status(500).json({
            message: 'Error obteniendo las page views',
            error: error.message
        }); 
    }
};
