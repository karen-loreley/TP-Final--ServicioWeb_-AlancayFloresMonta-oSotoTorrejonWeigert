const mongoose = require('mongoose');
const mercadopago = require('mercadopago');
const Payment = require('mercadopago');
const paymentService = require('../service/paymentService.js');


mercadopago.configurations.setAccessToken('TEST-8375554891244595-070723-9bba8c34bf20623643c4ce7831bfd377-610012598');

const PagoMercado = require('../models/pagoMercado');
const pagoMercadoCtrl = {}


pagoMercadoCtrl.createOrder = async (req, res) => {

  const preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseFloat(req.body.price),
        quantity: 1,
      }
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending"
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({
      id: response.body.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating preference");
  }

  /*
   const result = await mercadopago.preferences.create({
    items: [    
        {
          title: 'Test',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10.5
        }
      ]
   })
   console.log(result);*/

}

module.exports = pagoMercadoCtrl;