
const mysql = require("mysql2")


const mysqlModel = mysql.createConnection({
   host: "localhost",
    port  :  3306,
    user: "root",
    password: "9691501076",
    database: "IwcnTasks"
})

mysqlModel.connect((err) => {
    if (err) { console.log(err.message) }
    else { console.log("MySQL DB Connected") }
})

module.exports = { mysqlModel }
