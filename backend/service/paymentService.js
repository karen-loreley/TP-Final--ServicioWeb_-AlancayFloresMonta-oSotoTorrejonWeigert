const axios = require('axios');
const { application } = require('express');


class paymentService{
    async createPayment(){
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
        //    payer_email: "comprador@email.com",
            items: [
            {
                title:  "Title",
                descripcion: "descripcion",
                picture_url: "http://www.myapp.com/myimage.jpg",
                category_id: "category",
                quantity: 1,
                unit_price: 10000
            }

            ],
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            }



        }
        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ${process.env.ACCESS_TOKEN}'
            }
        });
        return payment.data;
    }
}