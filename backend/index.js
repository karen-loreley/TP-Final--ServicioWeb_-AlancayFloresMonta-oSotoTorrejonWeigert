const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database.js');
var app = express();

//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/local', require('./routes/localRouter'));
app.use('/api/propietario', require('./routes/propietario.route.js'));
app.use('/api/alquiler', require('./routes/alquiler.route.js'));
app.use('/api/novedades', require('./routes/novedadesRouter'));
//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
