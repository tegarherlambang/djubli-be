const db = require("./../models/index")
module.exports.getLastRunningNumber = async (field, table) => {
    const data = await db.sequelize.query(`SELECT ${field} as code FROM "${table}" ORDER BY "createdAt" DESC LIMIT 1`, { type: db.Sequelize.QueryTypes.SELECT })
    if (data.length > 0) {
        const number = parseInt(data[0].code.match(/[0-9]+/g)) + 1;
        if (number < 9999) {
            return ("000" + number.toString()).slice(-4)
        }
        return number
    }
    return "0001"
}