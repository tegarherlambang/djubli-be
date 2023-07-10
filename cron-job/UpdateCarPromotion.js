const logger = require("../helper/logger")
const cron = require('node-cron');
const CarsModel = require("../models/CarsModel");
const { Op } = require('sequelize');

cron.schedule('0 0 * * *', async () => {
    try {
        const data = await CarsModel.update({
            is_promotion_active: false,
        }, {
            where: {
                promotion_end_date: {
                    [Op.lt]: new Date()
                }
            }
        })
        logger.info(`(CRON) , Data: ${data}}`)
    } catch (error) {
        logger.error(`(CRON) , Error: ${error}}`)
    }
});