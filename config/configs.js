require('dotenv').config();

let configs = {
    API_Key : process.env.API_Key,
    attractionsGetCall : process.env.Attraction_get_call,
    getPriceAndAvaliabilityPostCall : process.env.GetPriceAndAvaliability_post_call,
    createBookingAndGetResponsePostCall : process.env.CreateBookingAndGetResponse_post_call
}

module.exports = configs;