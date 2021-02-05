let axios = require('axios');

let configs = require('../config/configs');
let attractionModel = require('../models/attractions.model');

const headers = {
    'Content-Type': 'application/json',
    'API-Key': configs.API_Key
};

class AttractionTask {
    /**
    Get list of attractions in a city or country
    pending take parameters from postman
    */
    static async getListOfAttractions(req, res, next) {
        try {
            let response = await axios.get(`${configs.attractionsGetCall}?country=Argentina&city=Bariloche&page=1&category=Adventure&currency=SGD`, { headers: headers });
            if (response.statusText == 'OK') {
                // console.log(response.data);

                return res.status(200).send({
                    success: true,
                    data: response.data,
                    message: `data posted and avaliability details fetched`
                })
            } else console.log(`Failed to fetch Data.`)
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: `Internal Server Problem`,
                data: `${err}`
            })
        }
    }
    /**
     * Store the attraction details in your system 
     * pending storing in database mongo localhost
    */
    static async storeAttractions(req, res, next) {
        try {
            let response = await axios.get(`${configs.attractionsGetCall}?country=Argentina&city=Bariloche&page=1&category=Adventure&currency=SGD`, { headers: headers });
            if (response.statusText == 'OK') {
                let insertData = await attractionModel.insertMany(response.data.data);
                if (insertData) {
                    return res.json({
                        success: true,
                        message: `Attraction model generated successfully`,
                        // data : response.data.data
                    })
                } else console.log(`Data not inserted failed !`)
            } else console.log(`Response failed to fetch`);
        }
        catch (err) {
            res.json({
                success: false,
                message: `Internal Server Problem`,
                data: `${err}`
            })
        }
    }

    /**
     * Get the pricing and avaliability of any attraction
    */
    static async getPricingAndAvaliabilityData(req, res, next) {
        try {
            let body = req.body;
            let myObj = JSON.parse((body.types));
            let pricingAndAvaliability = await axios.post(`${configs.getPriceAndAvaliabilityPostCall}`, {
                id: req.body.id,
                start: req.body.start,
                end: req.body.end,
                currency: req.body.currency,
                types: myObj
            }, {
                headers
            });
            console.log(pricingAndAvaliability.statusText);
            console.log(pricingAndAvaliability.data.data.prices)
            return res.status(200).send({
                success: true,
                // data: pricingAndAvaliability,
                message: `Pricing And Avaliability of data fetched successfully`
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                data: err,
                message: `Internal Server Problem`
            })
        }
    }

    /**
     * Based on the data received from attraction and price and avaliability endpoints create a booking
     * and store the booking response.
     */
    static async createBookingAndStoreBooking(req, res, next) {
        try {
            let body = req.body;
            let obj = {
                "firstName": body.firstName,
                "lastName": body.lastName,
                "personTitle": body.personTitle,
                "email": body.email,
                "phone": body.phone,
                "passport": body.passport,
                "date": body.date,
                "pickup": body.pickup,
                "comments": body.comments,
                "currency": body.currency,
                "bookings": [
                    {
                        "id": body.id,
                        "type": body.type,
                        "ticketId": body.ticketId,
                        "attractionId": body.attractionId,
                        // Array of objects will be built and sent from client side.
                        "questions": [{
                            "id": "TA1370",
                            "answer": "1997-10-12"
                        }, {
                            "id": "TA1371",
                            "answer": "1997-10-12"
                        }, {
                            "id": "TA1372",
                            "answer": "1997-10-12"
                        }, {
                            "id": "TA1373",
                            "answer": "1997-10-12"
                        }, {
                            "id": "TA1374",
                            "answer": "IN"
                        }, {
                            "id": "TA1375",
                            "answer": "MALE"
                        }, {
                            "id": "TA1376",
                            "answer": "Hotel"
                        }],
                        "firstName": body.firstName,
                        "lastName": body.lastName,
                        "personTitle": body.personTitle,
                        "email": body.email,
                        "phone": body.phone
                    }
                ]

            };
            let createBooking = await axios.post(`${configs.createBookingAndGetResponsePostCall}`, obj, {
                headers
            });
            if (createBooking) {
                console.log(createBooking);
                return res.json({
                    success: true,
                    data: createBooking.data,
                    message: `Booking created successfully`
                })
            }

        }
        catch (err) {
            return res.status(500).send({
                success: false,
                data: `${err}`,
                message: `Internal Server problem`
            })
        }
    }
// ------------------------------===========================----------------------
    /**
     * Final Api output
    */
    static async bookTicketByAttractionIdAndTicketId(req, res, next) {
        try {
            let body = req.body;
            //Two ways to get params Data one from request and directly pass params value to axios
            let getAttractionById = await axios.get(`${configs.attractionsGetCall}?id=${body.id}&currency=${body.currency}`, {
                headers
            });
            if (getAttractionById.statusText == 'OK') {
                // console.log(getAttractionById.data);
                let myObj = JSON.parse((body.types));
                let pricingAndAvaliability = await axios.post(`${configs.getPriceAndAvaliabilityPostCall}`, {
                    id: getAttractionById.data.data[0].ticketTypesAndPackages.id,
                    start: req.body.start,
                    end: req.body.end,
                    currency: body.currency,
                    types: myObj
                }, {
                    headers
                });
                if (pricingAndAvaliability.statusText == 'OK') {
                    let obj = {
                        "firstName": body.firstName,
                        "lastName": body.lastName,
                        "personTitle": body.personTitle,
                        "email": body.email,
                        "phone": body.phone,
                        "passport": body.passport,
                        "date": body.date,
                        "pickup": body.pickup,
                        "comments": body.comments,
                        "currency": body.currency,
                        "bookings": [
                            {
                                "id": pricingAndAvaliability.data.data.prices.id,
                                "type": pricingAndAvaliability.data.data.prices.type,
                                "ticketId": getAttractionById.data.data[0].ticketTypesAndPackages.id,
                                "attractionId": getAttractionById.data.data[0].id,
                                // Array of objects will be built and sent from client side.
                                "questions": [{
                                    "id": "TA1370",
                                    "answer": "1997-10-12"
                                }, {
                                    "id": "TA1371",
                                    "answer": "1997-10-12"
                                }, {
                                    "id": "TA1372",
                                    "answer": "1997-10-12"
                                }, {
                                    "id": "TA1373",
                                    "answer": "1997-10-12"
                                }, {
                                    "id": "TA1374",
                                    "answer": "IN"
                                }, {
                                    "id": "TA1375",
                                    "answer": "MALE"
                                }, {
                                    "id": "TA1376",
                                    "answer": "Hotel"
                                }],
                                "firstName": body.firstName,
                                "lastName": body.lastName,
                                "personTitle": body.personTitle,
                                "email": body.email,
                                "phone": body.phone
                            }
                        ]

                    };
                    let createBooking = await axios.post(`${configs.createBookingAndGetResponsePostCall}`, obj, {
                        headers
                    });
                    if (createBooking) {
                        return res.json({
                            success: true,
                            message: `Bookind done and stored`,
                            data: createBooking.data.data
                        })
                    } else console.log(`Booking Not created and try again`);
                } else console.log(`No Pricing and Avaliability data found `);
                // console.log(pricingAndAvaliability);
            } else console.log('No Attraction Data found by this Id');

            return res.json({
                success: true,
            })
        }
        catch (err) {
            return res.json({
                success: false,
                data: `${err}`,
                message: `Internal Server Problem`
            })
        }
    }

}

module.exports = AttractionTask;
