const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('./database.js');
var app = express();

//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

        // Aumentar el límite de tamaño de carga a 50MB (ajusta según tus necesidades)
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
        // O, si estás usando `express.json` y `express.urlencoded`:
        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ limit: '50mb', extended: true }));
        
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/local', require('./routes/localRouter'));
app.use('/api/propietario', require('./routes/propietario.route.js'));
app.use('/api/alquiler', require('./routes/alquiler.route.js'));
app.use('/api/novedades', require('./routes/novedadesRouter'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
<<<<<<< HEAD
app.use('/api/promocion', require('./routes/PromocionesRouter.js'));
=======
>>>>>>> 3b72607a382ad630b2cf4fa9bd5a713e7c2a5b67
//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
