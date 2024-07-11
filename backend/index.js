const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database.js');
var app = express();
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-7435184822730950-071020-0d5d46ad29a4408739ca12827966590c-1896999924',
});


//middlewares    
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
//mercado Pago
app.post('/crear-preferencia', async (req, res) => {
  try {
    let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: 'http://localhost:4200/pago-exitoso',
      failure: 'http://localhost:4200/pago-fallido',
      pending: 'http://localhost:4200/pago-pendiente',
    },
    auto_return: 'approved',
  };
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.json({
      id: response.body,
    });
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar la preferencia de pago' +req.body});
  }
});

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});
