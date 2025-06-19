// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Crear un pool de conexiones para evitar que la conexión se cierre por inactividad
const connection = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión a la base de datos establecida con ID ' + connection.threadId);
    connection.release();
});

module.exports = connection;
