const express = require('express');
const {paymentRoutes} = require('./routes/payment.route.js')
const cors = require('cors');
const {mongoose} = require('./database.js');
var app = express();

//middlewares
//app.use(express.json());
//app.use(cors());
    
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
              
app.use(cors({origin: 'http://localhost:4200'}));
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/local', require('./routes/localRouter'));
app.use('/api/propietario', require('./routes/propietario.route.js'));
app.use('/api/alquiler', require('./routes/alquiler.route.js'));
app.use('/api/novedades', require('./routes/novedadRouter.js'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/promocion', require('./routes/PromocionesRouter.js'));
app.use('/api/pago', require('./routes/pago.route.js'));
app.use('/', require('./routes/payment.route.js'));
app.use('/api/', require('./routes/pago.route.js'));


//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
