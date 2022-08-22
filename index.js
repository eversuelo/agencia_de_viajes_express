import express from 'express';
const app = express();
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';
//Definir Puerto
const port = process.env.PORT || 4000;
//Conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de Datos Conectada')).catch(error => console.log(error));
//Habilita el Pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.nowYear = year.getFullYear();
    res.locals.siteName = 'Agencia de Viajes';
    return next();
})
//Agregar Body Parser para leer los datos del formulario

app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'))
//Agregar el router
app.use('/', router);


app.listen(port, () => {
    console.log("El servidor funeciona en el puerto " + port)
});