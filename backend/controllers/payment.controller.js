const mongoose = require('mongoose');
const mercadopago = require('mercadopago');
const Payment = require('mercadopago');
const paymentService = require('../service/paymentService.js');



const PagoMercado = require('../models/pagoMercado');
const pagoMercadoCtrl = {}


pagoMercadoCtrl.createOrder = async (req, res) => {

  mercadopago.configure({
    access_token:'APP_USR-7426806883583257-070800-78a2cf07e165ab9d6e23a9375bdf1647-1889902603',
  })
  const preference = {
    items: [
      {
        title: req.body.title,
        unit_price: 1,
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
    console.log(response);
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